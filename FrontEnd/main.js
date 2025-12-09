import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

console.log('Hello world');


// 監聽檔案選擇
document.getElementById('avatarInput')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // 1. 本地預覽
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('avatarPreview').src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // 2. 上傳到後端
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
        const response = await fetch('/api/user/avatar', {
            method: 'POST',
            body: formData
        });
        // 處理上傳結果...
    } catch (error) {
        console.error('上傳失敗', error);
    }
});