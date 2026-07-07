/**
 * ItemDetail - 物品详情页模块
 * 照片上传、图标选择、存放位置编辑。
 */

(function() {
  'use strict';

  let currentItemId = null;

  window.ItemDetail = {
    open(itemId) {
      currentItemId = itemId;
      render();
    },
  };

  const DETAIL_ICONS = [
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

  function render() {
    const item = window.store.getItem(currentItemId);
    if (!item) { window.App.goHome(); return; }

    const scene = window.store.getScene(item.sceneId);

    document.getElementById('item-detail-title').textContent = item.icon + ' ' + item.name;

    document.getElementById('item-detail-content').innerHTML = `
      <!-- 照片区域 -->
      <div class="detail-section">
        <label class="detail-label">照片</label>
        <div class="photo-upload" id="photo-upload-area">
          ${item.photoDataUrl
            ? `<img src="${item.photoDataUrl}" class="photo-preview" id="photo-preview" />`
            : `<div class="photo-placeholder" id="photo-placeholder">
                <span class="photo-icon">📷</span>
                <span class="photo-hint">点击上传照片</span>
              </div>`}
          <input type="file" id="photo-input" accept="image/*" style="display:none" />
          ${item.photoDataUrl ? '<button class="btn btn-cancel btn-sm" id="btn-photo-remove">删除照片</button>' : ''}
        </div>
      </div>

      <!-- 图标 -->
      <div class="detail-section">
        <label class="detail-label">图标</label>
        <div class="icon-picker detail-icon-picker" id="detail-icon-picker">
          ${DETAIL_ICONS.map(e => `<span class="icon-option${e === item.icon ? ' selected' : ''}" data-emoji="${e}">${e}</span>`).join('')}
        </div>
      </div>

      <!-- 物品名称 -->
      <div class="detail-section">
        <label class="detail-label">物品名称</label>
        <input type="text" class="modal-input" id="detail-item-name" value="${escapeAttr(item.name)}" maxlength="30" />
      </div>

      <!-- 存放位置 -->
      <div class="detail-section">
        <label class="detail-label">存放位置</label>
        <input type="text" class="modal-input" id="detail-item-location" value="${escapeAttr(item.storageLocation || '')}" placeholder="例如：玄关抽屉" maxlength="50" />
      </div>

      <!-- 所属场景 -->
      <div class="detail-section detail-meta">
        <span class="detail-meta-text">所属场景：${scene ? scene.icon + ' ' + scene.name : ''}</span>
      </div>

      <!-- 保存按钮 -->
      <button class="btn btn-primary btn-full" id="btn-detail-save">保存修改</button>
    `;

    bindEvents(item);
  }

  function bindEvents(item) {
    // 照片上传
    const uploadArea = document.getElementById('photo-upload-area');
    const photoInput = document.getElementById('photo-input');

    if (uploadArea) {
      uploadArea.addEventListener('click', (e) => {
        if (e.target.closest('#btn-photo-remove')) return;
        photoInput.click();
      });
    }

    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const dataUrl = ev.target.result;
          window.store.updateItem(currentItemId, { photoDataUrl: dataUrl });
          render();
        };
        reader.readAsDataURL(file);
      });
    }

    // 删除照片
    const removeBtn = document.getElementById('btn-photo-remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.store.updateItem(currentItemId, { photoDataUrl: null });
        render();
      });
    }

    // 图标选择
    const picker = document.getElementById('detail-icon-picker');
    if (picker) {
      picker.addEventListener('click', (e) => {
        const opt = e.target.closest('.icon-option');
        if (!opt) return;
        picker.querySelectorAll('.icon-option').forEach(el => el.classList.remove('selected'));
        opt.classList.add('selected');
      });
    }

    // 保存
    document.getElementById('btn-detail-save').addEventListener('click', () => {

      const name = document.getElementById('detail-item-name').value.trim();
      if (!name) { showToast('请输入物品名称'); return; }

      const selectedIcon = document.querySelector('#detail-icon-picker .icon-option.selected');
      const icon = selectedIcon ? selectedIcon.dataset.emoji : item.icon;
      const location = document.getElementById('detail-item-location').value.trim();

      window.store.updateItem(currentItemId, { name, icon, storageLocation: location });
      showToast('已保存');
      window.App.goToScene(item.sceneId);
    });

    // 智能 Emoji 联想（详情页名称输入）
    EmojiSuggest.watch(
      document.getElementById('detail-item-name'),
      document.getElementById('detail-icon-picker')
    );

  }

  function showToast(msg) {
    if (window.showToast) window.showToast(msg);
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
