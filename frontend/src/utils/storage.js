// Utility function for storage with error handling
const storage = {
  async get(key) {
    try {
      const result = await window.storage.get(key);
      return result ? JSON.parse(result.value) : null;
    } catch (error) {
      console.log(`Key not found: ${key}`);
      return null;
    }
  },
  async set(key, value) {
    try {
      const result = await window.storage.set(key, JSON.stringify(value));
      return result !== null;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  async list(prefix) {
    try {
      const result = await window.storage.list(prefix);
      return result ? result.keys : [];
    } catch (error) {
      console.error('List error:', error);
      return [];
    }
  }
};

export default storage;

