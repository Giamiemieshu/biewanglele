/**
 * App - 应用主模块（路由 + 页面切换 + 全局工具）
 */

(function() {
  'use strict';

  // 全局 store 实例
  window.store = new DataStore();

  // ==================== 页面路由 ====================

  const PAGES = {
    HOME: 'page-home',
    SCENE: 'page-scene',
    ITEM_DETAIL: 'page-item-detail',
  };

  // ==================== FAB 按钮多页面适配 ====================

  function updateFAB() {
    const fab = document.getElementById('fab-add');
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    if (activePage.id === 'page-home') {
      fab.textContent = '＋';
      fab.setAttribute('aria-label', '新建场景');
    } else if (activePage.id === 'page-scene' || activePage.id === 'page-item-detail') {
      fab.textContent = '＋';
      fab.setAttribute('aria-label', '添加物品');
    }
  }

  function handleFABClick() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    if (activePage.id === 'page-home') {
      if (window.Scenes && window.Scenes.showNewScene) window.Scenes.showNewScene();
    } else if (activePage.id === 'page-scene' || activePage.id === 'page-item-detail') {
      if (window.Items && window.Items.showAddItem) window.Items.showAddItem();
    }
  }

  // 在 FAB 点击和页面切换时联动
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    updateFAB();
  }

  function goHome() {
    window.currentSceneId = null;
    // 清空搜索输入
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    showPage(PAGES.HOME);
    if (window.Scenes) window.Scenes.refresh();
  }

  function goToScene(sceneId) {
    window.currentSceneId = sceneId;
    showPage(PAGES.SCENE);
    if (window.Items) window.Items.openScene(sceneId);
  }

  function goToItemDetail(itemId) {
    showPage(PAGES.ITEM_DETAIL);
    if (window.ItemDetail) window.ItemDetail.open(itemId);
  }

  // 供其他模块调用
  window.App = {
    PAGES,
    showPage,
    goHome,
    goToScene,
    goToItemDetail,
  };

  // ==================== 页面切换事件 ====================

  function initNavigation() {
    // FAB 按钮
    document.getElementById('fab-add').addEventListener('click', handleFABClick);
    // 返回按钮（场景详情 → 首页）
    document.getElementById('btn-back-scene').addEventListener('click', () => {
      goHome();
    });
    // 返回按钮（物品详情 → 场景详情）
    document.getElementById('btn-back-item').addEventListener('click', () => {
      goToScene(window.currentSceneId);
    });
  }

  // ==================== 全局 Toast ====================

  window.showToast = function(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
  };

  // ==================== 初始化 ====================

  function init() {
    initNavigation();
    goHome();
    console.log('🎒 别忘带了 v1.0 — Step 1 完成');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
