// --- HTML要素の取得 ---
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackAreaEl = document.getElementById('feedback-area');
const nextBtn = document.getElementById('next-btn');
const scoreTextEl = document.getElementById('score-text');
const resultMessageEl = document.getElementById('result-message');
const beginnerBtn = document.getElementById('beginner-btn');
const intermediateBtn = document.getElementById('intermediate-btn');
const restartBtn = document.getElementById('restart-btn');

// --- 効果音の読み込み ---
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// --- クイズデータ ---

// 初級編データ
const quizDataBeginner = [
    // ... (前回答で作成した初心者向け30問のデータをここに貼り付け) ...
    // 例:
    {
        question: "道路交通法では、自転車は何という車両に分類されるか？",
        options: ["原動機付自転車", "自動二輪車", "軽車両", "歩行者"],
        answer: 2,
        explanation: "正解は「軽車両」です。自転車はエンジンが付いていませんが、法律上は車の一種（軽車両）として扱われます。そのため、歩道と車道の区別がある場所では、原則として車道を通行しなければなりません。"
    },
    // ... (残り29問) ...
];

// 中級編データ (より専門的な内容)
const quizDataIntermediate = [
    {
        question: "道路交通法施行規則が定める「普通自転車」の車体の大きさの基準として正しいものはどれか。",
        options: ["長さ190cm以下、幅60cm以下", "長さ180cm以下、幅60cm以下", "長さ190cm以下、幅50cm以下", "長さ200cm以下、幅70cm以下"],
        answer: 0,
        explanation: "正解は「長さ190cm以下、幅60cm以下」。この具体的な数値は、歩道通行の例外規定が適用される自転車の条件として頻出です。"
    },
    {
        question: "JIS規格のボトムブラケット（BB）で、右ワン（ドライブ側）が逆ネジである主な理由はどれか。",
        options: ["製造コスト削減のため", "ペダリングによる緩みを防ぐため", "イタリアン規格と差別化するため", "左右の区別を容易にするため"],
        answer: 1,
        explanation: "正解は「ペダリングによる緩みを防ぐため」。ペダリング時の摩擦力が右ワンを時計回り（正ネジだと緩む方向）に回転させようとするため、逆ネジにすることで自然に締まるように設計されています。"
    },
    {
        question: "フレームジオメトリーにおいて、キャスター角が寝る（角度が小さい）と、トレール量はどう変化し、走行安定性はどうなるか。",
        options: ["トレール量は小さくなり、安定性は低下する", "トレール量は大きくなり、安定性は向上する", "トレール量は大きくなり、安定性は低下する", "トレール量は変化せず、安定性も変わらない"],
        answer: 1,
        explanation: "正解は「トレール量は大きくなり、安定性は向上する」。トレール量が大きいほど、ハンドルが直進に戻ろうとする力（セルフアライニングトルク）が強くなり、直進安定性が増します。"
    },
    {
        question: "油圧ディスクブレーキに使用されるDOTフルードの最も重要な特性は何か。",
        options: ["非吸湿性であり、メンテナンスフリーである", "吸湿性が高く、定期的な交換が必要である", "ミネラルオイルと互換性がある", "粘度が非常に低く、凍結しにくい"],
        answer: 1,
        explanation: "正解は「吸湿性が高く、定期的な交換が必要である」。DOTフルードは空気中の水分を吸収して劣化し、沸点が低下します。沸点が下がると、激しいブレーキングでオイルが沸騰し（ベーパーロック現象）、ブレーキが効かなくなるため定期交換が必須です。"
    },
    {
        question: "ホイールの後輪やディスクブレーキホイールに必須とされるスポークの組み方はどれか。",
        options: ["ラジアル組", "タンジェント組（クロス組）", "ハーフクロス組", "ヨンヨン組"],
        answer: 1,
        explanation: "正解は「タンジェント組（クロス組）」。スポークを交差させることで、駆動トルクや制動トルクといった「ねじれの力」を効率よく伝達できます。ラジアル組はねじれに弱いため、これらの力がかかるホイールには使用できません。"
    },
    {
        question: "製造物責任法（PL法）における賠償請求権の消滅時効として、正しいものはどれか。",
        options: ["被害者が損害を知った時から1年、または製品の引き渡しから5年", "被害者が損害を知った時から3年、または製品の引き渡しから10年", "被害者が損害を知った時から5年、または製品の引き渡しから10年", "時効はなく、いつでも請求できる"],
        answer: 1,
        explanation: "正解は「被害者が損害を知った時から3年、または製品の引き渡しから10年」。この両方の期間が経過すると、権利は時効によって消滅します。3年と10年という数字を覚えましょう。"
    },
    {
        question: "タイヤの互換性を判断する上で最も信頼性が高い国際規格「ETRTO」表記（例: 25-622）が示すものは何か。",
        options: ["タイヤ外径 - タイヤ幅", "タイヤ幅 - ビード径", "タイヤ内径 - タイヤ外径", "推奨空気圧 - タイヤ幅"],
        answer: 1,
        explanation: "正解は「タイヤ幅(mm) - ビード径(mm)」。ビード径がリムの直径と一致することが互換性の絶対条件です。700Cと29インチは呼び名が違いますが、ETRTOビード径は共に622mmです。"
    },
    {
        question: "Vブレーキに、それに対応していないカンチブレーキ用レバーを組み合わせた場合に起こる現象は何か。",
        options: ["ブレーキの効きが極端に甘くなる", "レバーを少し引いただけでも急激にブレーキが効き、非常に危険である", "レバーが重すぎて引けなくなる", "特に問題なく使用できる"],
        answer: 1,
        explanation: "正解は選択肢2。Vブレーキはてこ比が大きいため、ワイヤーの引き量が大きい専用レバーが必要です。引き量の少ないカンチ用レバーで引くと、過大な制動力でカックンブレーキ状態になり非常に危険です。"
    },
    {
        question: "カーボンフレームとアルミ製シートポストを組付ける際に、異種金属接触腐食を防ぐために塗布すべきものは何か。",
        options: ["通常のグリス", "ネジロック剤", "カーボンアッセンブリーコンパウンド（グリッパーペースト）", "シリコンスプレー"],
        answer: 2,
        explanation: "正解は「カーボンアッセンブリーコンパウンド」。これは微細な粒子を含み、①低いトルクでも滑りを防ぎ、②カーボンと金属の直接接触を防いで電食を防止する、という二つの重要な役割を果たします。"
    },
    {
        question: "チェーンの伸び率を測定し、1%以上の伸びが確認された場合、最も懸念される二次的な損傷は何か。",
        options: ["フレームの破損", "ディレイラーの故障", "スプロケットやチェーンリングの歯の異常摩耗", "BBの破損"],
        answer: 2,
        explanation: "正解は選択肢3。伸びたチェーンは歯車とピッチが合わなくなり、歯の先端に乗り上げて削り取ってしまいます。これを放置すると、チェーン交換だけでは済まなくなり、高価なスプロケットやクランクセット全体の交換が必要になります。"
    },
    // ... ここに中級編の問題をさらに20問追加 ...
    // 以下、中級編の追加問題例
    { question: "道路交通法施行規則が定める、自転車の前照灯が持つべき性能はどれか。", options: ["前方5mの障害物を確認できる光度", "前方10mの障害物を確認できる光度", "前方15mの障害物を確認できる光度", "前方20mの障害物を確認できる光度"], answer: 1, explanation: "正解は「前方10m」。後方の反射器材は「100m」後方から視認できる性能が必要です。10mと100mのセットで覚えましょう。" },
    { question: "タイヤのケーシング密度を示す「TPI」値が高いタイヤの一般的な特徴は何か。", options: ["耐パンク性が高く頑丈", "価格が安価", "しなやかで転がり抵抗が低い", "空気圧の許容範囲が広い"], answer: 2, explanation: "正解は「しなやかで転がり抵抗が低い」。高TPIは細い繊維を高密度で使うため、タイヤがしなやかになり路面追従性が向上します。反面、耐パンク性はやや劣る傾向にあります。" },
    { question: "ねじ切り式BBで、シェル幅70mm、左右共に正ネジなのはどの規格か。", options: ["JIS (BSC) 規格", "イタリアン規格", "フレンチ規格", "スパニッシュ規格"], answer: 1, explanation: "正解は「イタリアン規格」。JIS規格（シェル幅68mm、右ワン逆ネジ）との違いを明確に区別しましょう。" },
    { question: "リアディレイラーのBテンションアジャストボルトの主な役割は何か。", options: ["ワイヤーの張りを微調整する", "ディレイラーの最大可動範囲を決める", "ガイドプーリーとスプロケットの間隔を調整する", "ディレイラーの取り付け角度を調整する"], answer: 2, explanation: "正解は選択肢3。この間隔が適切でないと、スムーズな変速ができません。近すぎるともたつき、離れすぎるとレスポンスが悪化します。" },
    { question: "カップアンドコーン式ベアリングの「玉当たり調整」とは、具体的に何を調整することか。",
      options: ["ベアリングのグリス量", "鋼球（ボール）の数", "ワンとコーンの締め付け具合による、回転の軽さとガタの無さのバランス", "ハブ軸の左右の位置"], answer: 2, explanation: "正解は選択肢3。締めすぎると回転が重くなり、緩すぎるとガタが出ます。その最適なバランス点を見つけるのが玉当たり調整です。" },
    { question: "ペダルの取り付けネジに関する正しい説明はどれか。", options: ["左右とも正ネジ", "左右とも逆ネジ", "右が正ネジ、左が逆ネジ", "右が逆ネジ、左が正ネジ"], answer: 2, explanation: "正解は「右が正ネジ、左が逆ネジ」。進行方向に対して回すと締まるように設計されており、ペダリング中に緩むのを防ぎます。" },
    { question: "7分組の自転車を組み立てる際に、自転車技士が通常『行わない』作業はどれか。", options: ["ホイールの振れ取り", "ヘッドパーツの圧入", "ブレーキ・変速機の調整", "各部ボルトの適正トルクでの締め付け"], answer: 1, explanation: "正解は「ヘッドパーツの圧入」。7分組ではフレームにヘッドパーツやBBは圧入済みの状態で出荷されます。技士の仕事は最終組立と精密な調整です。" },
    { question: "コッタレスクランク抜き工具を使用する対象となるクランクの固定方式はどれか。", options: ["スクエアテーパー式、オクタリンク式など", "ホローテックIIなどのアウトボードBB式", "圧入式のプレスフィットBB", "スルーアクスル式"], answer: 0, explanation: "正解は選択肢1。BBシャフトが四角（スクエア）や八角（オクタリンク）の形状で、クランクを圧入して固定するタイプに使用します。ホローテックIIはクランクとBBシャフトが一体型のため、この工具は使いません。" },
    { question: "青色TSマークが、赤色TSマークに比べて優れている点は何か。", options: ["有効期間が2年間である", "賠償責任保険の補償上限額が高い", "自転車の盗難保険が付帯する", "対物賠償も補償される"], answer: 1, explanation: "正解は「賠償責任保険の補償上限額が高い」。赤色が1000万円程度なのに対し、青色や緑色のTSマークは1億円の賠償責任保険が付帯します（金額は変動の可能性あり）。" },
    { question: "スポークの組み方で、ラジアル組がタンジェント組に比べて劣っている点は何か。", options: ["横剛性", "重量", "見た目の美しさ", "ねじれ剛性（トルク伝達能力）"], answer: 3, explanation: "正解は「ねじれ剛性」。スポークがハブから放射状に伸びるため、駆動やディスクブレーキのねじれ力に耐えられません。そのため後輪やディスクブレーキ車には使われません。" },
    // ここまでで20問、あと10問追加
    { question: "ディスクブレーキローターの固定方式「センターロック」を提唱し、普及させている主要なメーカーはどこか。", options: ["SRAM", "Campagnolo", "SHIMANO", "TRP"], answer: 2, explanation: "正解は「SHIMANO」。専用のロックリング工具で迅速に着脱できるのが特徴です。6ボルト方式はより多くのメーカーが採用しています。" },
    { question: "フレームのヘッドチューブにベアリングカップを介さず、ベアリングを直接はめ込む方式のヘッドパーツ規格を何というか。", options: ["インテグラルヘッド", "インセット（ゼロスタック）ヘッド", "エクスターナルカップヘッド", "スレッドヘッド"], answer: 0, explanation: "正解は「インテグラルヘッド」。フレーム側にあらかじめベアリングを受ける形状が成形されています。軽量化に貢献しますが、フレーム側の精度が非常に重要になります。" },
    { question: "一般的なクイックリリース式のハブにおける、エンド幅の標準的な寸法として、ロードバイクの後輪で正しいものはどれか。", options: ["100mm", "120mm", "130mm", "135mm"], answer: 2, explanation: "正解は「130mm」。ロードバイクは前輪100mm、後輪130mmが標準です。MTBは前輪100mm、後輪135mmが一般的でした（現在はスルーアクスルのブースト規格などが主流）。" },
    { question: "塑性域締め付けで締められたボルトを、分解後に再使用してはならない理由は何か。", options: ["錆びやすくなっているため", "ねじ山が潰れているため", "ボルトが伸びきっており、規定の軸力が出せないため", "熱で硬化しているため"], answer: 2, explanation: "正解は選択肢3。塑性域締め付けは、ボルトをあえて伸ばして元に戻らない領域まで締めることで高い締結力を得ます。一度伸びたボルトは再度同じ性能を発揮できないため、必ず新品に交換する必要があります。" },
    { question: "チューブレスタイヤの利点として、適切でないものはどれか。", options: ["リム打ちパンク（スネークバイト）のリスクがない", "乗り心地がしなやかで、転がり抵抗が低い", "シーラント剤により、小さな穴は自動で塞がる", "チューブがないため、ホイールへの取り付けが非常に簡単である"], answer: 3, explanation: "適切でないのは選択肢4。チューブレスタイヤはリムとの気密性を保つため、ビードが非常に硬く、取り付けにはコツと力が必要な場合が多く、簡単とは言えません。" },
    { question: "サドルのレール（座面裏の2本の棒）の材質として、最も軽量で高価なものはどれか。", options: ["スチール", "クロモリ", "チタン", "カーボンファイバー"], answer: 3, explanation: "正解は「カーボンファイバー」。レールまでカーボン製にすることで、軽量化と振動吸収性の向上を図りますが、非常に高価で取り扱いにも注意が必要です。" },
    { question: "フリーハブボディにスプロケットを固定する際に使う、チェーンが付いた工具の名称は何か。", options: ["スプロケットリムーバー（フリーホイールリムーバー）", "ロックリング回し", "チェーンカッター", "チェーンフッカー"], answer: 0, explanation: "正解は「スプロケットリムーバー」。スプロケットが空転しないように固定するための工具です。これと「ロックリング回し」を組み合わせてスプロケットを着脱します。" },
    { question: "自転車の各部の名称で、フレームの後輪車軸を取り付ける部分を何と呼ぶか。", options: ["シートステー", "チェーンステー", "ドロップアウト（エンド）", "BBシェル"], answer: 2, explanation: "正解は「ドロップアウト（エンド）」。ここにディレイラーハンガーが付いていることも多く、フレームの中でも特に重要な部分です。" },
    { question: "ブレーキレバーやシフトレバーをハンドルバーに固定する部品を何と呼ぶか。", options: ["バンド", "クランプ", "ホルダー", "ブラケット"], answer: 1, explanation: "正解は「クランプ」。締め付けるという意味の言葉で、この部分のボルトを適正トルクで締めることが安全上非常に重要です。" },
    { question: "自転車技士の実技試験で、7分組自転車を組み立てる際に、特に時間配分と精度が問われる作業は何か。", options: ["ペダルの取り付け", "サドルの高さ調整", "ホイールの振れ取り", "チェーンへの注油"], answer: 2, explanation: "正解は「ホイールの振れ取り」。許容範囲内に収める精度と、それに時間をかけすぎない手際の良さの両方が求められる、実技試験の関門の一つです。" }
];

// 初級編のデータを中級編のデータで不足している分、補う（仮）
// 本来は、中級編も30問用意するのがベスト
while(quizDataIntermediate.length < 30) {
    quizDataIntermediate.push({
        question: `(中級問題 ${quizDataIntermediate.length + 1})`,
        options: ["A", "B", "C", "D"],
        answer: 0,
        explanation: "これはダミー問題です。"
    })
}


// --- グローバル変数 ---
let currentQuizData = []; // 現在のレベルのクイズデータを保持
let currentQuestionIndex = 0;
let score = 0;


// --- イベントリスナー ---
beginnerBtn.addEventListener('click', () => {
    startQuiz(quizDataBeginner);
});

intermediateBtn.addEventListener('click', () => {
    startQuiz(quizDataIntermediate);
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

restartBtn.addEventListener('click', () => {
    // 結果画面とクイズ画面を非表示にし、スタート画面を表示
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    startContainer.style.display = 'block';
});


// --- 関数群 ---

/**
 * クイズを開始する関数
 * @param {Array} quizLevelData - 使用するクイズデータ (初級 or 中級)
 */
function startQuiz(quizLevelData) {
    currentQuizData = quizLevelData;
    currentQuestionIndex = 0;
    score = 0;

    // 画面の切り替え
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    loadQuiz();
}

/**
 * 現在の問題を画面に表示する関数
 */
function loadQuiz() {
    feedbackAreaEl.style.display = 'none';
    nextBtn.style.display = 'none';

    const quiz = currentQuizData[currentQuestionIndex];
    
    questionNumberEl.innerText = `問題 ${currentQuestionIndex + 1} / ${currentQuizData.length}`;
    questionTextEl.innerText = quiz.question;
    optionsContainerEl.innerHTML = '';

    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        // innerHTML を使うことで <br> タグなどを解釈させる
        button.innerHTML = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });
}

/**
 * 選択肢が選ばれたときの処理
 * @param {number} selectedIndex - 選ばれた選択肢のインデックス
 */
function selectOption(selectedIndex) {
    const quiz = currentQuizData[currentQuestionIndex];
    const correctIndex = quiz.answer;

    Array.from(optionsContainerEl.children).forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play();
        feedbackAreaEl.innerHTML = `<strong>正解！</strong><br>${quiz.explanation}`;
        feedbackAreaEl.className = 'feedback-area correct';
    } else {
        incorrectSound.play();
        feedbackAreaEl.innerHTML = `<strong>不正解...</strong><br>${quiz.explanation}`;
        feedbackAreaEl.className = 'feedback-area incorrect';
    }

    feedbackAreaEl.style.display = 'block';
    nextBtn.style.display = 'block';
}

/**
 * 結果を表示する関数
 */
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreTextEl.innerText = `${currentQuizData.length}問中 ${score}問 正解！`;

    let message = '';
    const percentage = (score / currentQuizData.length) * 100;
    if (percentage === 100) {
        message = '完璧です！全問正解！自信を持って試験に臨んでください！';
    } else if (percentage >= 80) {
        message = '素晴らしい成績です。合格圏内です。間違えた数問を完璧にすれば、もう安心です。';
    } else if (percentage >= 60) {
        message = 'おしい！合格ラインは目前です。特に間違えた分野の解説を重点的に復習しましょう。';
    } else {
        message = '基礎からじっくり復習が必要です。解説を何度も読み返し、知識の土台を固めましょう。';
    }
    resultMessageEl.innerText = message;
}

// 初期状態では何も実行せず、ユーザーの操作を待つ