document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-to-quiz-btn');

    // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);

    // URLに "?from=quiz" が含まれているかチェック
    if (urlParams.get('from') === 'quiz') {
        // 含まれていれば、ボタンを表示する
        backBtn.style.display = 'flex';
    }
});