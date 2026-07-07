/**
 * Items - 物品清单管理模块
 * 场景详情页渲染、物品 CRUD、复选框逻辑、导航到物品详情。
 */

(function() {
  'use strict';

  // 当前查看的场景 ID
  let currentSceneId = null;

  // ==================== 对外接口 ====================

  window.Items = {
    openScene(sceneId) {
      currentSceneId = sceneId;
      renderSceneDetail();
      document.getElementById('fab-add').setAttribute('aria-label', '添加物品');
    },
    refresh() {
      if (currentSceneId) renderSceneDetail();
    },
    showAddItem() {
      showAddItemModal();
    },
  };

  // ==================== 渲染 ====================

  function renderSceneDetail() {
    if (!currentSceneId) return;
    const scene = window.store.getScene(currentSceneId);
    if (!scene) { window.App.goHome(); return; }

    document.getElementById('scene-title').textContent = scene.icon + ' ' + scene.name;

    const items = window.store.getItems(currentSceneId);
    const container = document.getElementById('item-list');

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">📦</span>
          <p>还没有物品，点右下角添加</p>
        </div>`;
      return;
    }

    const allChecked = items.every(i => i.checked);

    container.innerHTML = items.map(item => `
      <div class="item-row" data-id="${item.id}">
        <label class="item-checkbox-label">
          <input type="checkbox" class="item-checkbox" ${item.checked ? 'checked' : ''} />
          <span class="checkbox-custom"></span>
        </label>
        <div class="item-content" data-action="detail">
          <div class="item-icon-wrapper">
            ${item.photoDataUrl
              ? `<img class="item-photo-thumb" src="${item.photoDataUrl}" alt="${escapeAttr(item.name)}" />`
              : `<span class="item-emoji">${item.icon || '📦'}</span>`}
          </div>
          <div class="item-info">
            <div class="item-name">${escapeHtml(item.name)}</div>
            ${item.storageLocation
              ? `<div class="item-location">📍 ${escapeHtml(item.storageLocation)}</div>`
              : ''}
          </div>
        </div>
        <button class="item-btn-delete" data-action="delete" title="删除物品">✕</button>
      </div>
    `).join('');

    // 如果全部勾选，触发成功出门
    if (allChecked && items.length > 0) {
      setTimeout(() => window.Checkout && window.Checkout.celebrate(currentSceneId), 300);
    }
  }

  // ==================== 添加物品 ====================

  function showAddItemModal() {
    document.getElementById('fab-add').textContent = '＋';
    if (!currentSceneId) return;
    document.getElementById('modal-item-title').textContent = '添加物品';
    document.getElementById('modal-item-name').value = '';
    document.getElementById('modal-item-location').value = '';
    renderItemIcons();
    document.getElementById('modal-item-overlay').style.display = 'flex';
    // 智能 Emoji 联想
    setTimeout(() => {
      EmojiSuggest.watch(
        document.getElementById('modal-item-name'),
        document.getElementById('modal-item-icons')
      );
    }, 50);
    document.getElementById('modal-item-name').focus();
  }

  const ITEM_ICONS = [
    '🎒','📱','🔑','👕','👖','👟','🧢','🧤',
    '🥤','🍱','🔌','💻','📷','🎧','💳','🪪',
    '🧴','💊','📖','✏️','👜','🧳','🌂','⌚',
    '🎮','🏸','⚽','🎨','🔧','📋','🛒','🧺',
    '🧣','🧦','👗','👘','🥋','👙','🩱','🩳',
    '👔','👞','🥾','🩴','👝','🧵','🪡','🪥',
    '🫧','🧻','🧹','🗑️','🔋','📡','🖥️','🖨️',
    '📠','☎️','📺','🖼️','🕯️','💡','🔦','🧲',
    '👑','👒','🎩','🎓','⛑️','💍','💎','📿',
    '🥻','🩲','👚','👛','🥿','👠','👡','👢',
    '🪞','🪮','🎀','🧷','💄','💋','🫦','💅',
    '🪐','💫','🌟','🔥','💥','☄️','⚡','🌪️',
    '🌈','☀️','🌤️','⛅','🌥️','☁️','🌦️','🌧️',
    '⛈️','🌩️','🌨️','❄️','☃️','⛄','🌬️','💨',
    '💧','💦','☔','☂️','🌊','🌍','🌎','🌏',
    '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓',
    '🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅',
    '🍆','🥑','🥦','🥬','🥒','🌽','🥕','🧄',
    '🧅','🥔','🍠','🥜','🌰','🍞','🥐','🥖',
    '🧀','🥚','🍳','🥞','🧇','🥓','🥩','🍗',
    '🍖','🌭','🍔','🍟','🍕','🥪','🥙','🌮',
    '🌯','🥗','🥘','🥫','🍝','🍜','🍲','🍛',
    '🍣','🥟','🍤','🍙','🍚','🍘','🍥','🥠',
    '🥮','🍢','🍡','🍧','🍨','🍩','🍪','🎂',
    '🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯',
    '🥛','☕','🍵','🍶','🍾','🍷','🍸','🍹',
    '🍺','🍻','🥂','🥃','🥄','🍴','🥢','🍽️',
    '🔪','🏺','🪣','🧯','🛢️','🧹','🪠','🧺',
    '🪤','🪟','🚪','🛋️','🪑','🛏️','🛌','🚿',
    '🛁','🚽','🪠','🧴','🪥','🪞','🧻','🧷',
    '✂️','📏','📐','📍','📎','🖇️','📌','🔗',
    '🔐','🔒','🔓','🔏','🗝️','🔨','🪓','⚒️',
    '🛠️','⛏️','🪚','🔩','⚙️','🪛','⛓️','🧲',
    '🔫','💣','⚔️','🛡️','🕳️','💉','💊','🩹',
    '🩺','🩻','🩼','🩸','🦷','🦴','👁️','👅',
    '👄','🫀','🫁','🧠','🦵','🦶','👂','👃',
    '👋','🤚','🖐️','✋','🖖','👌','✌️','🤞',
    '🤟','🤘','🤙','👍','👎','✊','👊','🤛',
    '🤜','👏','🙌','🤲','🤝','🙏','✍️','💪',
    '🤳','🦾','🦿','🦵','🦶','👂','🦻','👃',
    '🧠','🫀','🫁','🦷','🦴','👀','👁️','👅',
    '👄','🫦','💋','💘','💝','💟','🕊️','🐾',
    '🌲','🌳','🌴','🌵','🎄','🌲','🌱','🌿',
    '☘️','🍀','🎍','🪴','🎋','🍃','🍂','🍁',
    '🍄','🐚','🌾','💐','🌷','🌹','🥀','🌺',
    '🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚',
    '🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔',
    '🪨','🧱','🏠','🏡','🏢','🏣','🏤','🏥',
    '🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯',
    '🏰','💒','🗼','🗽','⛪','🕌','🕍','⛩️',
    '🕋','⛲','⛺','🌁','🌃','🏙️','🌄','🌅',
    '🌆','🌇','🌉','🎠','🎡','🎢','🎪','🎭',
    '🎨','🎬','🎤','🎧','🎼','🎹','🥁','🪘',
    '🎷','🎺','🎸','🪕','🎻','🎲','♟️','🎯',
    '🎳','🎮','🕹️','🎰','🚗','🚕','🚙','🚌',
    '🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚',
    '🚛','🚜','🏍️','🛵','🛺','🚲','🛴','🛹',
    '🚏','🛣️','🛤️','⛽','🚧','⚓','⛵','🛶',
    '🚤','🛳️','⛴️','🛥️','🚢','✈️','🛩️','🛫',
    '🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰️',
    '🚀','🛸','🪐','🌠','🌌','⛱️','🏖️','🏝️',
    '🏜️','🏔️','⛰️','🏕️','🗻','🌋','🏟️','🎟️',
    '🎫','🎗️','🏅','🥇','🥈','🥉','🏆','🏵️',
    '🎖️','🪅','🪩','🎊','🎉','🎈','🎁','🎀',
    '🪭','🎐','🎏','🪆','🪪','🏳️','🏴','🏁',
    '🚩','🎌','🏳️‍🌈','🇺🇳','❤️','🧡','💛','💚',
    '💙','💜','🖤','🤍','🤎','🔴','🟠','🟡',
    '🟢','🔵','🟣','🟤','⚫','⚪','🔘','🛑',
    '⛔','🚫','🚳','🚭','🚯','🚱','🔞','📵',
  ];

  function renderItemIcons(selectedEmoji) {
    const container = document.getElementById('modal-item-icons');
    container.innerHTML = ITEM_ICONS.map(emoji =>
      `<span class="icon-option${emoji === selectedEmoji ? ' selected' : ''}" data-emoji="${emoji}">${emoji}</span>`
    ).join('');
    // 默认选中第一个
    const first = container.querySelector('.icon-option');
    if (first && !selectedEmoji) first.classList.add('selected');
  }

  function handleAddItem() {
    const name = document.getElementById('modal-item-name').value.trim();
    if (!name) { showToast('请输入物品名称'); return; }

    const selected = document.querySelector('#modal-item-icons .icon-option.selected');
    const icon = selected ? selected.dataset.emoji : '📦';
    const location = document.getElementById('modal-item-location').value.trim();

    window.store.addItem({
      sceneId: currentSceneId,
      name,
      icon,
      storageLocation: location,
    });

    hideModal('modal-item-overlay');
    showToast('物品已添加');
    renderSceneDetail();
  }

  // ==================== 删除物品 ====================

  function handleDeleteItem(itemId) {
    const item = window.store.getItem(itemId);
    if (!item) return;

    window.store.deleteItem(itemId);
    showToast('已删除');
    renderSceneDetail();
  }

  // ==================== 复选框 ====================

  function handleCheckboxChange(itemId, checked) {
    window.store.updateItem(itemId, { checked });
    renderSceneDetail();
  }

  // ==================== 弹窗工具 ====================

  function hideModal(id) {
    document.getElementById(id).style.display = 'none';
  }

  function showToast(msg) {
    if (window.showToast) window.showToast(msg);
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ==================== 事件绑定 ====================

  function initEvents() {
    // 场景详情页：添加物品、删除、复选框、跳转详情
    document.getElementById('page-scene').addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;

      if (action === 'detail') {
        const row = e.target.closest('.item-row');
        if (row) {
          window.App.goToItemDetail(row.dataset.id);
        }
      }

      const deleteBtn = e.target.closest('.item-btn-delete');
      if (deleteBtn) {
        const row = deleteBtn.closest('.item-row');
        if (row) handleDeleteItem(row.dataset.id);
      }
    });

    // 复选框变化
    document.getElementById('page-scene').addEventListener('change', (e) => {
      const cb = e.target.closest('.item-checkbox');
      if (!cb) return;
      const row = cb.closest('.item-row');
      if (row) handleCheckboxChange(row.dataset.id, cb.checked);
    });

    // 添加物品弹窗
    // FAB 按钮已由 app.js 统一管理
    document.getElementById('modal-item-confirm').addEventListener('click', handleAddItem);
    document.getElementById('modal-item-cancel').addEventListener('click', () => hideModal('modal-item-overlay'));

    document.getElementById('modal-item-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAddItem();
    });

    // 物品图标选择
    document.getElementById('modal-item-icons').addEventListener('click', (e) => {
      const opt = e.target.closest('.icon-option');
      if (!opt) return;
      document.querySelectorAll('#modal-item-icons .icon-option').forEach(el => el.classList.remove('selected'));
      opt.classList.add('selected');
    });

    // 遮罩关闭
    document.getElementById('modal-item-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) hideModal('modal-item-overlay');
    });
  }

  // ==================== 初始化 ====================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
  } else {
    initEvents();
  }

})();
