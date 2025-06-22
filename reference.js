document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-to-quiz-btn');
    const homeBtn = document.getElementById('home-btn');

    // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const fromQuiz = urlParams.get('from');

    // 「クイズに戻る」ボタンの表示制御
    if (fromQuiz === 'quiz') {
        backBtn.href = 'index.html'; 
        backBtn.style.display = 'flex';
    }

    // 「TOPへ」ボタンは常に表示
    homeBtn.style.display = 'flex';

    // 「TOPへ」ボタンのクリックイベント
    homeBtn.addEventListener('click', (e) => {
        if (sessionStorage.getItem('quizProgress')) {
            const isSure = confirm('TOPページに戻ります。クイズの進行状況はリセットされますが、よろしいですか？');
            if (isSure) {
                sessionStorage.removeItem('quizProgress');
            } else {
                e.preventDefault();
            }
        }
    });
});