/**
 * Checkout - 成功出门流程
 * 检测全部勾选 → 弹窗鼓励 → 记录出门 → 重置复选框。
 */

(function() {
  'use strict';

  window.Checkout = {
    celebrate(sceneId) {
      showCelebration(sceneId);
    },
  };

  function showCelebration(sceneId) {
    const scene = window.store.getScene(sceneId);
    if (!scene) return;

    const messages = [
      '祝你出门顺利，享受美好时光 🌟',
      '东西都带齐了，放心出发吧 ✨',
      '准备充分，今天一定会很棒 🎉',
      '好习惯！出门前检查，一件不落 👍',
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    document.querySelector('#modal-celebrate-overlay .celebrate-text').textContent = msg;
    document.getElementById('modal-celebrate-overlay').dataset.sceneId = sceneId;
    document.getElementById('modal-celebrate-overlay').style.display = 'flex';
  }

  function completeCheckout() {
    const overlay = document.getElementById('modal-celebrate-overlay');
    const sceneId = overlay.dataset.sceneId;
    if (!sceneId) return;

    const items = window.store.getItems(sceneId);
    window.store.addCheckoutRecord(sceneId, items.length);

    // 重置所有复选框
    items.forEach(item => {
      if (item.checked) {
        window.store.updateItem(item.id, { checked: false });
      }
    });

    overlay.style.display = 'none';
    showToast('🎉 成功出门！');

    // 刷新场景列表和物品列表
    if (window.Scenes) window.Scenes.refresh();
    if (window.Items) window.Items.refresh();
  }

  function showToast(msg) {
    if (window.showToast) window.showToast(msg);
  }

  // 事件绑定
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('btn-celebrate-ok').addEventListener('click', completeCheckout);
      document.getElementById('modal-celebrate-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) completeCheckout();
      });
    });
  } else {
    document.getElementById('btn-celebrate-ok').addEventListener('click', completeCheckout);
    document.getElementById('modal-celebrate-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) completeCheckout();
    });
  }

})();
