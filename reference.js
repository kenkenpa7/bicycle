document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-to-quiz-btn');

    // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const fromQuiz = urlParams.get('from');
    const quizIndex = urlParams.get('index');

    // URLに "?from=quiz" が含まれているかチェック
    if (fromQuiz === 'quiz') {
        // ボタンのリンク先を設定
        // index.htmlはセッションストレージを見て自動で復元するので、単純にindex.htmlに戻るだけでOK
        backBtn.href = 'index.html'; 
        
        // ボタンを表示する
        backBtn.style.display = 'flex';
    }
});