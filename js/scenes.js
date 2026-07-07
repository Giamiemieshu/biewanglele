/**
 * Scenes - 场景管理模块
 * 渲染场景列表、新建/删除/置顶场景、显示频次。
 */

(function() {
  'use strict';

  const EMOJIS = [
    '📺','🎲','🍽️','🏃','💪','🚶','✈️','🎓',
    '🎬','🎮','🍕','🚴','🏊','🎿','🏕️','🎵',
    '📚','💼','🏖️','🛒','🎯','🧘','🎪','🏋️',
    '🚗','🐕','🎨','🔧','🎤','📷','🌲','🎁',
    '🎭','🏄','🌊','⛰️','🏔️','🎡','🎢','🏰',
    '🎠','🧗','🚵','🤿','🥾','🏇','⛷️','🎻',
    '🎹','📸','🎥','🧩','♟️','🎳','🥊','🚀',
    '🛸','🏆','🌸','🌺','🌻','🌴','🌵','🎄',
    '🌳','🌱','🌿','🍀','🍃','🍂','🍁','🌾',
    '💐','🌷','🌹','🥀','🌻','🌼','🌞','🌈',
    '⭐','🌟','✨','☀️','🌙','☁️','⛅','🌤️',
    '❄️','☃️','⛄','🌪️','🔥','💧','☔','🌊',
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼',
    '🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔',
    '🐧','🐦','🦆','🦅','🦉','🦇','🐺','🐗',
    '🐴','🦄','🐝','🦋','🐛','🐞','🐜','🦟',
    '🦗','🕷️','🐢','🐍','🦎','🦖','🦕','🐙',
    '🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬',
    '🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍',
    '🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘',
    '🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙',
    '🐐','🦌','🐕','🐩','🐈','🦃','🐇','🦩',
    '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓',
    '🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅',
    '🍆','🥑','🥦','🥬','🥒','🌽','🥕','🧄',
    '🧅','🥔','🍠','🥜','🌰','🍞','🥐','🥖',
    '🧀','🥚','🍳','🥞','🧇','🥓','🥩','🍗',
    '🍖','🌭','🍔','🍟','🍕','🥪','🥙','🧆',
    '🌮','🌯','🥗','🥘','🥫','🍝','🍜','🍲',
    '🍛','🍣','🥟','🍤','🍙','🍚','🍘','🍥',
    '🥠','🥮','🍢','🍡','🍧','🍨','🍩','🍪',
    '🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮',
    '🍯','🥛','☕','🍵','🍶','🍾','🍷','🍸',
    '🍹','🍺','🍻','🥂','🥃','❤️','🧡','💛',
    '💚','💙','💜','🖤','🤍','🤎','💔','❣️',
    '💕','💞','💓','💗','💖','💘','💝','💟',
    '☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎',
    '☯️','☦️','🛐','⛎','♈','♉','♊','♋',
    '♌','♍','♎','♏','♐','♑','♒','♓',
    '🆔','🆑','🆒','🆓','🆕','🆖','🆗','🆘',
    '🆙','🆚','🈁','🈶','🈯','🉐','🈹','🈚',
    '🈲','🉑','🈸','🈴','🈳','🈺','🈵','🔴',
    '🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪',
    '🔘','🛑','⛔','🚫','🚳','🚭','🚯','🚱',
    '🔞','📵','🚷','🏳️','🏴','🏁','🚩','🎌',
  ];

  let pendingDeleteId = null;
  let pendingEditScene = null;

  // ==================== 渲染场景列表 ====================

  // 暴露接口
  window.Scenes = {
    refresh: renderSceneList,
    showNewScene: showNewSceneModal,
    showEditScene: showEditSceneModal,
  };

  function renderSceneList() {
    const container = document.getElementById('scene-list');
    const emptyEl = document.getElementById('empty-state');
    const scenes = window.store.getSortedScenes();

    if (scenes.length === 0) {
      container.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';

    container.innerHTML = scenes.map(scene => `
      <div class="scene-card" data-id="${scene.id}" data-pinned="${scene.isPinned}">
        <div class="scene-card-main" data-action="open">
          <div class="scene-icon">${scene.icon}</div>
          <div class="scene-info">
            <div class="scene-name">${escapeHtml(scene.name)}</div>
            <div class="scene-meta">
              ${scene.useCount > 0
                ? `已出门 ${scene.useCount} 次 · 上次 ${formatDate(scene.lastUsedAt)}`
                : '还没用过'}
            </div>
          </div>
        </div>
        <div class="scene-card-actions">
          <button class="scene-btn-pin" data-action="pin" title="${scene.isPinned ? '取消置顶' : '置顶'}">
            ${scene.isPinned ? '📌' : '📍'}
          </button>
          <button class="scene-btn-delete" data-action="delete" title="删除">
            🗑️
          </button>
        </div>
      </div>
    `).join('');
  }

  // ==================== 弹窗管理 ====================

  function showModal(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
  }

  function hideAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(el => el.style.display = 'none');
  }

  // 新建场景弹窗
  function showNewSceneModal() {
    pendingEditScene = null;
    document.getElementById('modal-title').textContent = '新建场景';
    document.getElementById('modal-scene-name').value = '';
    renderIconPicker();
    showModal('modal-overlay');
  }

  // 编辑场景弹窗
  function showEditSceneModal(scene) {
    pendingEditScene = scene;
    document.getElementById('modal-title').textContent = '编辑场景';
    document.getElementById('modal-scene-name').value = scene.name;
    renderIconPicker(scene.icon);
    showModal('modal-overlay');
  }

  function renderIconPicker(selectedEmoji) {
    const container = document.getElementById('icon-picker');
    container.innerHTML = EMOJIS.map(emoji =>
      `<span class="icon-option${emoji === selectedEmoji ? ' selected' : ''}" data-emoji="${emoji}">${emoji}</span>`
    ).join('');
  }

  // 确认删除弹窗
  function showDeleteConfirm(text) {
    document.getElementById('modal-confirm-text').textContent = text;
    showModal('modal-confirm-overlay');
  }

  // ==================== 业务操作 ====================

  function handleSaveScene() {
    const nameInput = document.getElementById('modal-scene-name');
    const name = nameInput.value.trim();
    if (!name) {
      showToast('请输入场景名称');
      nameInput.focus();
      return;
    }

    const selectedIcon = document.querySelector('#icon-picker .icon-option.selected');
    const icon = selectedIcon ? selectedIcon.dataset.emoji : '📦';

    if (pendingEditScene) {
      // 编辑
      window.store.updateScene(pendingEditScene.id, { name, icon });
      showToast('场景已更新');
    } else {
      // 新建
      window.store.addScene({ name, icon });
      showToast('场景已创建');
    }

    hideAllModals();
    renderSceneList();
  }

  function handleDeleteScene(id) {
    const scene = window.store.getScene(id);
    if (!scene) return;
    pendingDeleteId = id;
    showDeleteConfirm(`确定要删除「${escapeHtml(scene.name)}」吗？同时会删除该场景下的所有物品。`);
  }

  function confirmDelete() {
    if (pendingDeleteId) {
      window.store.deleteScene(pendingDeleteId);
      showToast('已删除');
      pendingDeleteId = null;
      hideAllModals();
      renderSceneList();
    }
  }

  // ==================== 工具函数 ====================

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  // ==================== 事件绑定 ====================

  function initEvents() {
    // FAB 新建场景
    // FAB 事件由 app.js 统一管理，此处不再绑定

    // 弹窗确认/取消
    document.getElementById('btn-modal-confirm').addEventListener('click', handleSaveScene);
    document.getElementById('btn-modal-cancel').addEventListener('click', hideAllModals);
    document.getElementById('btn-confirm-ok').addEventListener('click', confirmDelete);
    document.getElementById('btn-confirm-cancel').addEventListener('click', () => {
      pendingDeleteId = null;
      hideAllModals();
    });

    // 点击遮罩关闭弹窗
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          pendingDeleteId = null;
          hideAllModals();
        }
      });
    });

    // 图标选择
    document.getElementById('icon-picker').addEventListener('click', (e) => {
      const opt = e.target.closest('.icon-option');
      if (!opt) return;
      document.querySelectorAll('#icon-picker .icon-option').forEach(el => el.classList.remove('selected'));
      opt.classList.add('selected');
    });

    // 场景卡片事件代理
    document.getElementById('scene-list').addEventListener('click', (e) => {
      const card = e.target.closest('.scene-card');
      if (!card) return;
      const id = card.dataset.id;
      const action = e.target.closest('[data-action]')?.dataset.action;

      if (action === 'pin') {
        window.store.togglePinScene(id);
        renderSceneList();
      } else if (action === 'delete') {
        handleDeleteScene(id);
      } else if (action === 'open') {
        window.App.goToScene(id);
      }
    });

    // 回车键触发表单确认
    document.getElementById('modal-scene-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSaveScene();
    });
  }

  // ==================== 初始化 ====================

  function init() {
    initEvents();
    renderSceneList();
    // 默认选中第一个图标
    const firstIcon = document.querySelector('#icon-picker .icon-option');
    if (firstIcon) firstIcon.classList.add('selected');
  }

  // 等 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
