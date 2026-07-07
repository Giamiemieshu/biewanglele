/**
 * Search - 搜索功能模块
 * 首页搜索框实时过滤场景和物品。
 */

(function() {
  'use strict';

  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounceTimer = null;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = input.value.trim();
        if (!query) {
          // 恢复显示全部场景
          if (window.Scenes) window.Scenes.refresh();
          return;
        }

        const results = window.store.search(query);
        renderSearchResults(results, query);
      }, 200);
    });
  }

  function renderSearchResults(results, query) {
    const container = document.getElementById('scene-list');
    const emptyEl = document.getElementById('empty-state');

    let html = '';

    if (results.scenes.length > 0) {
      html += '<div class="search-section-label">场景</div>';
      html += results.scenes.map(scene => `
        <div class="scene-card" data-id="${scene.id}" data-pinned="${scene.isPinned}">
          <div class="scene-card-main" data-action="open">
            <div class="scene-icon">${scene.icon}</div>
            <div class="scene-info">
              <div class="scene-name">${highlightMatch(scene.name, query)}</div>
              <div class="scene-meta">
                ${scene.useCount > 0 ? '已出门 ' + scene.useCount + ' 次' : '还没用过'}
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    if (results.items.length > 0) {
      html += '<div class="search-section-label">物品</div>';
      html += results.items.map(item => {
        const scene = window.store.getScene(item.sceneId);
        return `
          <div class="scene-card search-item-card" data-item-id="${item.id}" data-scene-id="${item.sceneId}">
            <div class="scene-card-main" data-action="open-item">
              <div class="scene-icon">${item.icon || '📦'}</div>
              <div class="scene-info">
                <div class="scene-name">${highlightMatch(item.name, query)}</div>
                <div class="scene-meta">${scene ? '来自：' + scene.icon + ' ' + scene.name : ''}</div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    if (!html) {
      emptyEl.style.display = 'block';
      emptyEl.innerHTML = '<span class="empty-icon">🔍</span><p>没有找到「' + escapeHtml(query) + '」</p>';
      container.innerHTML = '';
      return;
    }

    emptyEl.style.display = 'none';
    container.innerHTML = html;

    // 绑定搜索结果点击
    container.querySelectorAll('[data-action="open"]').forEach(el => {
      el.addEventListener('click', () => {
        const card = el.closest('.scene-card');
        if (card) window.App.goToScene(card.dataset.id);
      });
    });

    container.querySelectorAll('[data-action="open-item"]').forEach(el => {
      el.addEventListener('click', () => {
        const card = el.closest('.search-item-card');
        if (card) window.App.goToScene(card.dataset.sceneId);
      });
    });
  }

  function highlightMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    return escapeHtml(text.slice(0, idx))
      + '<mark>' + escapeHtml(text.slice(idx, idx + query.length)) + '</mark>'
      + escapeHtml(text.slice(idx + query.length));
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }

})();
