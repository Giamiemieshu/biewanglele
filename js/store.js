/**
 * DataStore - 数据持久层
 * 封装 LocalStorage 读写，提供场景、物品、出门记录的 CRUD 操作。
 * 数据格式：localStorage['biewanglele_data'] = JSON.stringify({ scenes, items, records })
 * 使用：const store = new DataStore();
 */

class DataStore {

  static STORAGE_KEY = 'biewanglele_data';

  constructor() {
    this.data = this._load();
    if (!this.data) {
      this.data = this._createDefaultData();
      this._save();
    }
  }

  // ==================== 内部方法 ====================

  _load() {
    try {
      const raw = localStorage.getItem(DataStore.STORAGE_KEY);
      if (raw) return JSON.parse(raw);
      return null;
    } catch (e) {
      console.warn('数据加载失败，使用默认数据', e);
      return null;
    }
  }

  _save() {
    try {
      localStorage.setItem(DataStore.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('数据保存失败', e);
    }
  }

  _generateId(prefix) {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  }

  _now() {
    return new Date().toISOString();
  }

  // ==================== 种子数据 ====================

  _createDefaultData() {
    const scenes = [
      { id: 'scene_preset_01', name: '看剧',   icon: '📺', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_02', name: '桌游',   icon: '🎲', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_03', name: '聚餐',   icon: '🍽️', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_04', name: '有氧',   icon: '🏃', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_05', name: '撸铁',   icon: '💪', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_06', name: '散步',   icon: '🚶', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_07', name: '出差',   icon: '✈️', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
      { id: 'scene_preset_08', name: '回学校报道', icon: '🎓', isPinned: false, createdAt: '2026-07-01T00:00:00.000Z', lastUsedAt: null, useCount: 0 },
    ];

    const items = [
      { id: 'item_preset_01', sceneId: 'scene_preset_05', name: '健身手套', icon: '🧤', photoDataUrl: null, storageLocation: '', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_02', sceneId: 'scene_preset_05', name: '水杯',     icon: '🥤', photoDataUrl: null, storageLocation: '', sortOrder: 1, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_03', sceneId: 'scene_preset_05', name: '毛巾',     icon: '🧴', photoDataUrl: null, storageLocation: '', sortOrder: 2, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_04', sceneId: 'scene_preset_05', name: '换洗衣服', icon: '👕', photoDataUrl: null, storageLocation: '', sortOrder: 3, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_05', sceneId: 'scene_preset_05', name: '运动鞋',   icon: '👟', photoDataUrl: null, storageLocation: '', sortOrder: 4, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_06', sceneId: 'scene_preset_07', name: '身份证',   icon: '🪪', photoDataUrl: null, storageLocation: '钱包', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_07', sceneId: 'scene_preset_07', name: '充电器',   icon: '🔌', photoDataUrl: null, storageLocation: '书桌抽屉', sortOrder: 1, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_08', sceneId: 'scene_preset_07', name: '换洗衣物', icon: '👔', photoDataUrl: null, storageLocation: '衣柜', sortOrder: 2, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_09', sceneId: 'scene_preset_07', name: '洗漱包',   icon: '🧴', photoDataUrl: null, storageLocation: '卫生间', sortOrder: 3, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_10', sceneId: 'scene_preset_07', name: '笔记本电脑', icon: '💻', photoDataUrl: null, storageLocation: '电脑包', sortOrder: 4, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_11', sceneId: 'scene_preset_07', name: '耳机',     icon: '🎧', photoDataUrl: null, storageLocation: '桌面', sortOrder: 5, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_12', sceneId: 'scene_preset_01', name: '零食',     icon: '🍿', photoDataUrl: null, storageLocation: '', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_13', sceneId: 'scene_preset_01', name: '毯子',     icon: '🛏️', photoDataUrl: null, storageLocation: '', sortOrder: 1, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_14', sceneId: 'scene_preset_06', name: '钥匙',     icon: '🔑', photoDataUrl: null, storageLocation: '玄关挂钩', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_15', sceneId: 'scene_preset_06', name: '手机',     icon: '📱', photoDataUrl: null, storageLocation: '', sortOrder: 1, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_16', sceneId: 'scene_preset_02', name: '想玩的桌游', icon: '🎮', photoDataUrl: null, storageLocation: '书架下层', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_17', sceneId: 'scene_preset_04', name: '运动水壶', icon: '🫗', photoDataUrl: null, storageLocation: '', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_18', sceneId: 'scene_preset_04', name: '速干衣',   icon: '👚', photoDataUrl: null, storageLocation: '', sortOrder: 1, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_19', sceneId: 'scene_preset_08', name: '学生证',   icon: '🪪', photoDataUrl: null, storageLocation: '书包内层', sortOrder: 0, createdAt: '2026-07-01T00:00:00.000Z' },
      { id: 'item_preset_20', sceneId: 'scene_preset_08', name: '校园卡',   icon: '💳', photoDataUrl: null, storageLocation: '卡包', sortOrder: 1, createdAt: '2026-07-01T00:00:00.000Z' },
    ];

    return { scenes, items, records: [] };
  }

  // ==================== 场景操作 ====================

  getScenes() {
    return [...this.data.scenes];
  }

  getScene(id) {
    return this.data.scenes.find(s => s.id === id) || null;
  }

  addScene({ name, icon }) {
    const scene = {
      id: this._generateId('scene'),
      name: name.trim(),
      icon: icon || '📦',
      isPinned: false,
      createdAt: this._now(),
      lastUsedAt: null,
      useCount: 0,
    };
    this.data.scenes.push(scene);
    this._save();
    return scene;
  }

  updateScene(id, updates) {
    const idx = this.data.scenes.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.data.scenes[idx] = { ...this.data.scenes[idx], ...updates };
    this._save();
    return this.data.scenes[idx];
  }

  deleteScene(id) {
    this.data.scenes = this.data.scenes.filter(s => s.id !== id);
    this.data.items = this.data.items.filter(i => i.sceneId !== id);
    this.data.records = this.data.records.filter(r => r.sceneId !== id);
    this._save();
  }

  recordSceneUse(id) {
    const scene = this.getScene(id);
    if (!scene) return null;
    return this.updateScene(id, {
      useCount: scene.useCount + 1,
      lastUsedAt: this._now(),
    });
  }

  togglePinScene(id) {
    const scene = this.getScene(id);
    if (!scene) return null;
    return this.updateScene(id, { isPinned: !scene.isPinned });
  }

  getSortedScenes() {
    const scenes = this.getScenes();
    scenes.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return scenes;
  }

  // ==================== 物品操作 ====================

  getItems(sceneId) {
    return this.data.items
      .filter(i => i.sceneId === sceneId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  getItem(id) {
    return this.data.items.find(i => i.id === id) || null;
  }

  addItem({ sceneId, name, icon, storageLocation }) {
    const sceneItems = this.getItems(sceneId);
    const item = {
      id: this._generateId('item'),
      sceneId,
      name: name.trim(),
      icon: icon || '📦',
      photoDataUrl: null,
      storageLocation: storageLocation || '',
      sortOrder: sceneItems.length,
      createdAt: this._now(),
    };
    this.data.items.push(item);
    this._save();
    return item;
  }

  updateItem(id, updates) {
    const idx = this.data.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.data.items[idx] = { ...this.data.items[idx], ...updates };
    this._save();
    return this.data.items[idx];
  }

  deleteItem(id) {
    this.data.items = this.data.items.filter(i => i.id !== id);
    this._save();
  }

  // ==================== 出门记录 ====================

  addCheckoutRecord(sceneId, itemCount) {
    const record = {
      id: this._generateId('record'),
      sceneId,
      itemCount,
      completedAt: this._now(),
    };
    this.data.records.push(record);
    this.recordSceneUse(sceneId);
    this._save();
    return record;
  }

  getCheckoutRecords(sceneId) {
    return this.data.records
      .filter(r => r.sceneId === sceneId)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  }

  getAllRecords() {
    return [...this.data.records];
  }

  // ==================== 搜索 ====================

  search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return { scenes: this.getSortedScenes(), items: [] };
    const matchedScenes = this.data.scenes.filter(s => s.name.toLowerCase().includes(q));
    const matchedItems = this.data.items.filter(i => i.name.toLowerCase().includes(q));
    return { scenes: matchedScenes, items: matchedItems };
  }

  // ==================== 工具方法 ====================

  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  importData(jsonStr) {
    try {
      const d = JSON.parse(jsonStr);
      if (!d.scenes || !d.items || !d.records) throw new Error('数据格式不正确');
      this.data = d;
      this._save();
      return true;
    } catch (e) {
      console.error('数据导入失败', e);
      return false;
    }
  }

  clearAll() {
    this.data = this._createDefaultData();
    this._save();
  }
}
