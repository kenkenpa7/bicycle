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
const progressBar = document.getElementById('progress-bar');

// --- 効果音の読み込み ---
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// --- クイズデータ ---

// 初級編データ
// script.js の中の quizDataBeginner を以下に置き換える

const quizDataBeginner = [
    { question: "道路交通法では、自転車は何という車両に分類されるか？", options: ["原動機付自転車", "自動二輪車", "軽車両", "歩行者"], answer: 2, explanation: "正解は「軽車両」です。そのため、原則として車道を通行する義務があります。", refId: 'ref-law-classification' },
    { question: "自転車で夜間にライトをつけずに走ると、法律違反になるか？", options: ["違反にならない", "違反になる", "街灯があれば違反にならない", "努力義務なので違反にはならない"], answer: 1, explanation: "正解は「違反になる」です。夜間は前照灯と後方の反射器材（または尾灯）が義務付けられています。", refId: 'ref-law-lights' },
    { question: "自転車の安全点検の合言葉「ブタベルサハシ」。この「ブ」は何の点検を指すか？", options: ["部品（パーツ）", "ブレーキ", "部分的な汚れ", "ブランド"], answer: 1, explanation: "正解は「ブレーキ」です。ブタベルサハシは、乗車前の基本的な安全点検項目を覚えるための語呂合わせです。", refId: 'ref-law-checklist' },
    { question: "「安全な自転車」の目印として、対人賠償保険が付いているマークはどれか？", options: ["JISマーク", "BAAマーク", "SGマーク", "リサイクルマーク"], answer: 2, explanation: "正解は「SGマーク」です。製品の欠陥が原因で人身事故が起きた場合に備える保険が付帯しています。", refId: 'ref-law-marks' },
    { question: "自転車の骨格となる、三角形を組み合わせたような本体部分を何と呼ぶか？", options: ["シャーシ", "ボディ", "フレーム", "ユニット"], answer: 2, explanation: "正解は「フレーム」です。自転車の性能や乗り心地の土台となる最も重要な部分です。", refId: 'ref-parts-frame' },
    { question: "ペダルを漕ぐと回転する、歯車が付いた棒状の部品を何と呼ぶか？", options: ["クランク", "シャフト", "アーム", "ディレイラー"], answer: 0, explanation: "正解は「クランク」です。ペダルを取り付け、足の力を回転運動に変える部品です。", refId: 'ref-parts-crank' },
    { question: "クランクの回転軸で、フレームの中心下部にあり、ペダルをスムーズに回すための部品は何か？", options: ["ハブ", "ヘッドパーツ", "ボトムブラケット (BB)", "シートポスト"], answer: 2, explanation: "正解は「ボトムブラケット (BB)」です。ペダルからの力を受け止める、縁の下の力持ちのような重要な回転部品です。", refId: 'ref-parts-bb' },
    { question: "ギアチェンジ（変速）を行うために、チェーンを歯車から歯車へ移動させる装置を何というか？", options: ["シフター", "ディレイラー", "スプロケット", "ブレーキレバー"], answer: 1, explanation: "正解は「ディレイラー」です。手元のレバー操作でチェーンを動かし、ペダルの重さを変えます。", refId: 'ref-parts-derailleur' },
    { question: "ハンドルの根元にあり、ハンドルと前輪フォークを繋ぎ、スムーズなハンドル操作を可能にする回転部品は何か？", options: ["ヘッドパーツ", "ステム", "ハブ", "BB"], answer: 0, explanation: "正解は「ヘッドパーツ」です。ここのベアリングによって、滑らかなハンドル操作が可能になります。", refId: 'ref-parts-headset' },
    { question: "ホイールの中心部分で、車軸（シャフト）とスポークを繋ぐ部品を何というか？", options: ["リム", "ニップル", "ハブ", "アクスル"], answer: 2, explanation: "正解は「ハブ」です。ホイールの回転の中心となる重要な部品です。", refId: 'ref-parts-hub' },
    { question: "スポーツバイクでよく使われる、細くて先端のネジを緩めてから空気を入れるバルブの形式は何か？", options: ["英式バルブ", "米式バルブ", "仏式バルブ", "独式バルブ"], answer: 2, explanation: "正解は「仏式バルブ」です。高圧の空気を入れやすいのが特徴です。", refId: 'ref-wheel-valve' },
    { question: "タイヤの側面に書かれている「700×25C」や「26×1.75」といった表記が表しているものは何か？", options: ["タイヤの製造年月日", "タイヤの価格", "タイヤのサイズ（外径と太さ）", "タイヤの推奨空気圧"], answer: 2, explanation: "正解は「タイヤのサイズ」です。交換部品を選ぶ際の基本情報となります。", refId: 'ref-wheel-tire-spec' },
    { question: "タイヤの互換性を確認する上で最も正確な国際規格のサイズ表記はどれか？", options: ["インチ表記", "フランス式表記", "ETRTO表記", "TPI表記"], answer: 2, explanation: "正解は「ETRTO（エトルト）表記」です。タイヤ幅とビード径で示され、互換性判断の最も確実な基準です。", refId: 'ref-wheel-tire-spec' },
    { question: "ロードバイクなどで一般的な、車輪のリムを両側から挟んで制動するブレーキを何というか？", options: ["ディスクブレーキ", "キャリパーブレーキ", "Vブレーキ", "ドラムブレーキ"], answer: 1, explanation: "正解は「キャリパーブレーキ」です。リムブレーキの一種で、構造がシンプルなのが特徴です。", refId: 'ref-wheel-brake-type' },
    { question: "ブレーキの音鳴りを防ぐために、ブレーキシューを進行方向に対して少し斜めに取り付ける調整を何というか？", options: ["トーイン調整", "キャンバー調整", "クリアランス調整", "ストローク調整"], answer: 0, explanation: "正解は「トーイン調整」です。シューの前方がわずかに早くリムに当たるように調整することで、共振音を防ぎます。", refId: 'ref-wheel-toein' },
    { question: "JIS(BSC)規格のボトムブラケットで、右側（チェーン側）のねじが「逆ネジ」になっている主な理由は何か？", options: ["左右を間違えないようにするため", "製造上の都合", "ペダルを漕ぐ力で緩むのを防ぐため", "イタリアの規格と区別するため"], answer: 2, explanation: "正解は「ペダルを漕ぐ力で緩むのを防ぐため」です。走行中に自然と締まる方向に力がかかるように工夫されています。", refId: 'ref-components-bb' },
    { question: "自転車のフレーム素材として使われる「クロモリ」とは、何の略称か？", options: ["クロム・モリブデン鋼", "クロス・モーター・バイク", "カーボン・モノコック", "クローム・メッキ"], answer: 0, explanation: "正解は「クロム・モリブデン鋼」。鉄をベースにした合金で、しなやかな乗り心地が特徴です。", refId: 'ref-material-cromoly' },
    { question: "軽量で設計の自由度が高い一方、強い衝撃で割れることがあるため、締め付けトルク管理が非常に重要なフレーム素材は何か？", options: ["クロモリ鋼", "アルミニウム合金", "チタン合金", "カーボンファイバー"], answer: 3, explanation: "正解は「カーボンファイバー」。締めすぎによる破損を防ぐため、トルクレンチによる管理が必須です。", refId: 'ref-material-carbon' },
    { question: "「チェーンが伸びる」という現象の正しい説明はどれか？", options: ["チェーンの金属プレート自体が伸びる", "チェーンのピンとローラーの隙間が摩耗で広がる", "使用によりチェーンが磁化して長くなる", "熱でチェーンが膨張する"], answer: 1, explanation: "正解は選択肢2です。部品同士の摩耗でガタが大きくなる現象で、伸びたチェーンは歯車を傷めます。", refId: 'ref-maintenance-chain' },
    { question: "ホイールを組む際、スポークを放射状にまっすぐ張る組み方を何というか？", options: ["タンジェント組（クロス組）", "ラジアル組", "イタリアン組", "JIS組"], answer: 1, explanation: "正解は「ラジアル組」です。軽量ですが、ねじれの力に弱いため、リムブレーキの前輪などに使われます。", refId: 'ref-wheel-spoke-radial' },
    { question: "ネジを指定された強さ（トルク）で正確に締めるために使う、整備に不可欠な工具は何か？", options: ["モンキーレンチ", "トルクレンチ", "プライヤー", "スパナ"], answer: 1, explanation: "正解は「トルクレンチ」です。特にカーボンパーツの整備では必須の工具です。", refId: 'ref-maintenance-torque' },
    { question: "クランクをBB（ボトムブラケット）の軸から安全に取り外すために使用する専用工具は何か？", options: ["チェーンカッター", "ペダルレンチ", "コッタレスクランク抜き", "ワイヤーカッター"], answer: 2, explanation: "正解は「コッタレスクランク抜き」です。固く圧入されたクランクを、てこの原理で安全に引き抜きます。", refId: 'ref-maintenance-tools' },
    { question: "ワイヤーの先端がバラバラにほつれるのを防ぐために被せる、小さな金属製のキャップを何と呼ぶか？", options: ["ニップル", "エンドキャップ", "フェルール", "グロメット"], answer: 1, explanation: "正解は「エンドキャップ」です。インナーワイヤーの先端に被せて、ほつれを防ぎます。", refId: 'ref-maintenance-tools' },
    { question: "ペダルの取り付けネジに関する正しい説明はどれか？", options: ["左右どちらも、時計回りで締まる", "左右どちらも、反時計回りで締まる", "右ペダルは時計回り、左ペダルは反時計回りで締まる", "右ペダルは反時計回り、左ペダルは時計回りで締まる"], answer: 2, explanation: "正解は選択肢3です。左ペダルは逆ネジになっています。進行方向に向かって回すと締まる、と覚えましょう。", refId: 'ref-components-pedal' },
    { question: "油圧ディスクブレーキのオイルラインに入り込んだ空気を抜き、新しいオイルを充填する作業を何というか？", options: ["ブリーディング", "フェイシング", "タッピング", "グリスアップ"], answer: 0, explanation: "正解は「ブリーディング」です。ブレーキライン内の空気を追い出し、ブレーキ性能を回復させる重要な作業です。", refId: 'ref-maintenance-bleeding' },
    { question: "自転車がまっすぐ走ろうとする性質（直進安定性）に最も大きく関わる、フレームの設計値を何というか？", options: ["シート角", "トレール量", "Qファクター", "スタンドオーバーハイト"], answer: 1, explanation: "正解は「トレール量」です。この値が大きいほど、ハンドルが直進に戻ろうとする力が強くなり、安定性が増します。", refId: 'ref-mechanics-geometry' },
    { question: "「7分組」の自転車を店舗で組み立てる際、通常は『行わない』作業はどれか？", options: ["ホイールの振れ取り調整", "ブレーキや変速機の調整", "フレームへのヘッドパーツの圧入", "ハンドルやペダルの取り付け"], answer: 2, explanation: "正解は「フレームへのヘッドパーツの圧入」です。これは工場で完了しており、販売店では最終的な組み立てと精密な調整を行います。", refId: 'ref-maintenance-7bun' },
    { question: "「カップアンドコーン式ベアリング」の最大の特徴は何か？", options: ["完全に密閉されており、メンテナンス不要である", "分解して清掃や玉当たりの微調整が可能である", "セラミック製で非常に高価である", "針状のローラーを使用している"], answer: 1, explanation: "正解は選択肢2です。分解して整備できるため、メンテナンス性に優れています。", refId: 'ref-components-bearing' },
    { question: "自転車のサドルの高さを合わせる際の、一般的な目安はどれか？", options: ["両足のつま先が、地面にしっかり着く高さ", "サドルにまたがり、ペダルが一番下に来た時に膝が完全に伸びきる高さ", "サドルにまたがり、ペダルが一番下に来た時に膝がわずかに曲がる高さ", "サドルの高さとハンドルの高さを同じにする"], answer: 2, explanation: "正解は選択肢3です。ペダルが一番下にあるときに膝が軽く曲がる程度が、最も効率的で負担の少ない高さです。", refId: 'ref-parts-saddle' },
    { question: "カーボンフレームとアルミ製のシートポストのように、異なる種類の金属（または導電体）が接触する際に注意すべき現象は何か？", options: ["熱膨張による固着", "異種金属接触腐食（電食）", "静電気による帯電", "金属疲労の促進"], answer: 1, explanation: "正解は「異種金属接触腐食（電食）」です。水分を介して接触すると片方の金属が錆びてしまうため、専用のコンパウンドで絶縁が必要です。", refId: 'ref-material-corrosion' }
];

// script.js の中の quizDataIntermediate を以下に置き換える

const quizDataIntermediate = [
    { question: "道路交通法施行規則が定める「普通自転車」の車体の大きさの基準として正しいものはどれか。", options: ["長さ190cm以下、幅60cm以下", "長さ180cm以下、幅60cm以下", "長さ190cm以下、幅50cm以下", "長さ200cm以下、幅70cm以下"], answer: 0, explanation: "正解は「長さ190cm以下、幅60cm以下」。歩道通行の例外規定に関わる重要な数値です。", refId: 'ref-law-spec' },
    { question: "JIS規格のボトムブラケット（BB）で、右ワン（ドライブ側）が逆ネジである主な理由はどれか。", options: ["製造コスト削減のため", "ペダリングによる緩みを防ぐため", "イタリアン規格と差別化するため", "左右の区別を容易にするため"], answer: 1, explanation: "正解は「ペダリングによる緩みを防ぐため」。走行中に自然と締まる方向に力がかかるように設計されています。", refId: 'ref-components-bb' },
    { question: "フレームジオメトリーにおいて、キャスター角が寝る（角度が小さい）と、トレール量はどう変化し、走行安定性はどうなるか。", options: ["トレール量は小さくなり、安定性は低下する", "トレール量は大きくなり、安定性は向上する", "トレール量は大きくなり、安定性は低下する", "トレール量は変化せず、安定性も変わらない"], answer: 1, explanation: "正解は「トレール量は大きくなり、安定性は向上する」。トレール量が大きいほど、直進安定性が増します。", refId: 'ref-mechanics-geometry' },
    { question: "油圧ディスクブレーキに使用されるDOTフルードの最も重要な特性は何か。", options: ["非吸湿性であり、メンテナンスフリーである", "吸湿性が高く、定期的な交換が必要である", "ミネラルオイルと互換性がある", "粘度が非常に低く、凍結しにくい"], answer: 1, explanation: "正解は「吸湿性が高く、定期的な交換が必要である」。水分を吸収して沸点が下がるため、定期交換しないと危険です。", refId: 'ref-maintenance-bleeding' },
    { question: "ホイールの後輪やディスクブレーキホイールに必須とされるスポークの組み方はどれか。", options: ["ラジアル組", "タンジェント組（クロス組）", "ハーフクロス組", "ヨンヨン組"], answer: 1, explanation: "正解は「タンジェント組（クロス組）」。ねじれの力（トルク）を効率よく伝達できるためです。", refId: 'ref-wheel-spoke-tangent' },
    { question: "製造物責任法（PL法）における賠償請求権の消滅時効として、正しいものはどれか。", options: ["被害者が損害を知った時から1年、または製品の引き渡しから5年", "被害者が損害を知った時から3年、または製品の引き渡しから10年", "被害者が損害を知った時から5年、または製品の引き渡しから10年", "時効はなく、いつでも請求できる"], answer: 1, explanation: "正解は「被害者が損害を知った時から3年、または製品の引き渡しから10年」です。", refId: 'ref-law-pl' },
    { question: "タイヤの互換性を判断する上で最も信頼性が高い国際規格「ETRTO」表記（例: 25-622）が示すものは何か。", options: ["タイヤ外径 - タイヤ幅", "タイヤ幅 - ビード径", "タイヤ内径 - タイヤ外径", "推奨空気圧 - タイヤ幅"], answer: 1, explanation: "正解は「タイヤ幅(mm) - ビード径(mm)」。ビード径が互換性の基準です。", refId: 'ref-wheel-tire-spec' },
    { question: "Vブレーキに、それに対応していないカンチブレーキ用レバーを組み合わせた場合に起こる現象は何か。", options: ["ブレーキの効きが極端に甘くなる", "レバーを少し引いただけでも急激にブレーキが効き、非常に危険である", "レバーが重すぎて引けなくなる", "特に問題なく使用できる"], answer: 1, explanation: "正解は選択肢2。てこ比の違いから、過大な制動力でカックンブレーキ状態になり非常に危険です。", refId: 'ref-wheel-brake-type' },
    { question: "カーボンフレームとアルミ製シートポストを組付ける際に、異種金属接触腐食を防ぐために塗布すべきものは何か。", options: ["通常のグリス", "ネジロック剤", "カーボンアッセンブリーコンパウンド（グリッパーペースト）", "シリコンスプレー"], answer: 2, explanation: "正解は「カーボンアッセンブリーコンパウンド」。滑り止め効果と、電食防止効果を併せ持ちます。", refId: 'ref-maintenance-material' },
    { question: "チェーンの伸び率を測定し、1%以上の伸びが確認された場合、最も懸念される二次的な損傷は何か。", options: ["フレームの破損", "ディレイラーの故障", "スプロケットやチェーンリングの歯の異常摩耗", "BBの破損"], answer: 2, explanation: "正解は選択肢3。伸びたチェーンは歯車とピッチが合わなくなり、歯車を急速に摩耗させてしまいます。", refId: 'ref-maintenance-chain' },
    { question: "道路交通法施行規則が定める、自転車の前照灯が持つべき性能はどれか。", options: ["前方5mの障害物を確認できる光度", "前方10mの障害物を確認できる光度", "前方15mの障害物を確認できる光度", "前方20mの障害物を確認できる光度"], answer: 1, explanation: "正解は「前方10m」。後方の反射器材は100mから視認できる性能が必要です。", refId: 'ref-law-spec' },
    { question: "タイヤのケーシング密度を示す「TPI」値が高いタイヤの一般的な特徴は何か。", options: ["耐パンク性が高く頑丈", "価格が安価", "しなやかで転がり抵抗が低い", "空気圧の許容範囲が広い"], answer: 2, explanation: "正解は「しなやかで転がり抵抗が低い」。細い繊維を高密度で使うため、しなやかになります。", refId: 'ref-wheel-tire-spec' },
    { question: "ねじ切り式BBで、シェル幅70mm、左右共に正ネジなのはどの規格か。", options: ["JIS (BSC) 規格", "イタリアン規格", "フレンチ規格", "スパニッシュ規格"], answer: 1, explanation: "正解は「イタリアン規格」。JIS規格（シェル幅68mm、右逆ネジ）との違いを明確に区別しましょう。", refId: 'ref-components-bb' },
    { question: "リアディレイラーのBテンションアジャストボルトの主な役割は何か。", options: ["ワイヤーの張りを微調整する", "ディレイラーの最大可動範囲を決める", "ガイドプーリーとスプロケットの間隔を調整する", "ディレイラーの取り付け角度を調整する"], answer: 2, explanation: "正解は選択肢3。この間隔が適切でないと、スムーズな変速ができません。", refId: 'ref-parts-derailleur' },
    { question: "カップアンドコーン式ベアリングの「玉当たり調整」とは、具体的に何を調整することか。", options: ["ベアリングのグリス量", "鋼球（ボール）の数", "ワンとコーンの締め付け具合による、回転の軽さとガタの無さのバランス", "ハブ軸の左右の位置"], answer: 2, explanation: "正解は選択肢3。締めすぎず緩すぎず、最適なバランス点を見つけるのが玉当たり調整です。", refId: 'ref-components-bearing' },
    { question: "ペダルの取り付けネジに関する正しい説明はどれか。", options: ["左右とも正ネジ", "左右とも逆ネジ", "右が正ネジ、左が逆ネジ", "右が逆ネジ、左が正ネジ"], answer: 2, explanation: "正解は「右が正ネジ、左が逆ネジ」。進行方向に対して回すと締まるように設計されています。", refId: 'ref-components-pedal' },
    { question: "7分組の自転車を組み立てる際に、自転車技士が通常『行わない』作業はどれか。", options: ["ホイールの振れ取り", "ヘッドパーツの圧入", "ブレーキ・変速機の調整", "各部ボルトの適正トルクでの締め付け"], answer: 1, explanation: "正解は「ヘッドパーツの圧入」。これは工場で行われる作業です。", refId: 'ref-maintenance-7bun' },
    { question: "コッタレスクランク抜き工具を使用する対象となるクランクの固定方式はどれか。", options: ["スクエアテーパー式、オクタリンク式など", "ホローテックIIなどのアウトボードBB式", "圧入式のプレスフィットBB", "スルーアクスル式"], answer: 0, explanation: "正解は選択肢1。BBシャフトにクランクを圧入して固定するタイプに使用します。", refId: 'ref-maintenance-tools' },
    { question: "青色TSマークが、赤色TSマークに比べて優れている点は何か。", options: ["有効期間が2年間である", "賠償責任保険の補償上限額が高い", "自転車の盗難保険が付帯する", "対物賠償も補償される"], answer: 1, explanation: "正解は「賠償責任保険の補償上限額が高い」。赤色よりも大幅に高額な補償が付帯します。", refId: 'ref-law-marks' },
    { question: "スポークの組み方で、ラジアル組がタンジェント組に比べて劣っている点は何か。", options: ["横剛性", "重量", "見た目の美しさ", "ねじれ剛性（トルク伝達能力）"], answer: 3, explanation: "正解は「ねじれ剛性」。駆動やディスクブレーキのトルクに耐えられないのが最大の欠点です。", refId: 'ref-wheel-spoke-radial' },
    { question: "ディスクブレーキローターの固定方式「センターロック」を提唱し、普及させている主要なメーカーはどこか。", options: ["SRAM", "Campagnolo", "SHIMANO", "TRP"], answer: 2, explanation: "正解は「SHIMANO」。専用工具で迅速に着脱できるのが特徴です。", refId: 'ref-wheel-brake-type' },
    { question: "フレームのヘッドチューブにベアリングカップを介さず、ベアリングを直接はめ込む方式のヘッドパーツ規格を何というか。", options: ["インテグラルヘッド", "インセット（ゼロスタック）ヘッド", "エクスターナルカップヘッド", "スレッドヘッド"], answer: 0, explanation: "正解は「インテグラルヘッド」。軽量ですが、フレーム側の精度が重要になります。", refId: 'ref-parts-headset' },
    { question: "一般的なクイックリリース式のハブにおける、エンド幅の標準的な寸法として、ロードバイクの後輪で正しいものはどれか。", options: ["100mm", "120mm", "130mm", "135mm"], answer: 2, explanation: "正解は「130mm」。前輪は100mmが標準です。", refId: 'ref-parts-hub' },
    { question: "塑性域締め付けで締められたボルトを、分解後に再使用してはならない理由は何か。", options: ["錆びやすくなっているため", "ねじ山が潰れているため", "ボルトが伸びきっており、規定の軸力が出せないため", "熱で硬化しているため"], answer: 2, explanation: "正解は選択肢3。一度伸ばしたボルトは元の性能を発揮できないため、必ず新品に交換します。", refId: 'ref-maintenance-plasticity' },
    { question: "チューブレスタイヤの利点として、適切でないものはどれか。", options: ["リム打ちパンク（スネークバイト）のリスクがない", "乗り心地がしなやかで、転がり抵抗が低い", "シーラント剤により、小さな穴は自動で塞がる", "チューブがないため、ホイールへの取り付けが非常に簡単である"], answer: 3, explanation: "適切でないのは選択肢4。ビードが硬く、気密性を保つ必要があるため、取り付けは簡単ではない場合が多いです。", refId: 'ref-wheel-tubeless' },
    { question: "サドルのレール（座面裏の2本の棒）の材質として、最も軽量で高価なものはどれか。", options: ["スチール", "クロモリ", "チタン", "カーボンファイバー"], answer: 3, explanation: "正解は「カーボンファイバー」。軽量化と振動吸収性に優れますが、高価で取り扱いに注意が必要です。", refId: 'ref-parts-saddle' },
    { question: "フリーハブボディにスプロケットを固定する際に使う、チェーンが付いた工具の名称は何か。", options: ["スプロケットリムーバー（フリーホイールリムーバー）", "ロックリング回し", "チェーンカッター", "チェーンフッカー"], answer: 0, explanation: "正解は「スプロケットリムーバー」。スプロケットが空転しないように固定するための工具です。", refId: 'ref-maintenance-tools' },
    { question: "自転車の各部の名称で、フレームの後輪車軸を取り付ける部分を何と呼ぶか。", options: ["シートステー", "チェーンステー", "ドロップアウト（エンド）", "BBシェル"], answer: 2, explanation: "正解は「ドロップアウト（エンド）」。フレームの末端部分です。", refId: 'ref-parts-dropout' },
    { question: "ブレーキレバーやシフトレバーをハンドルバーに固定する部品を何と呼ぶか。", options: ["バンド", "クランプ", "ホルダー", "ブラケット"], answer: 1, explanation: "正解は「クランプ」。締め付けるという意味の言葉です。", refId: 'ref-parts-clamp' },
    { question: "自転車技士の実技試験で、7分組自転車を組み立てる際に、特に時間配分と精度が問われる作業は何か。", options: ["ペダルの取り付け", "サドルの高さ調整", "ホイールの振れ取り", "チェーンへの注油"], answer: 2, explanation: "正解は「ホイールの振れ取り」。精度と手際の良さの両方が求められる、試験の関門の一つです。", refId: 'ref-maintenance-7bun' }
];

// ... (残りのJavaScriptロジックは変更不要です) ...


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
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    startContainer.style.display = 'block';
});


// --- 関数群 ---

function startQuiz(quizLevelData) {
    currentQuizData = quizLevelData;
    currentQuestionIndex = 0;
    score = 0;
    startContainer.style.display = 'none';
    resultContainer.style.display = 'none'; // 結果画面も非表示に
    quizContainer.style.display = 'block';
    loadQuiz();
}

function loadQuiz() {
    feedbackAreaEl.style.display = 'none';
    nextBtn.style.display = 'none';
    const quiz = currentQuizData[currentQuestionIndex];
    questionNumberEl.innerText = `問題 ${currentQuestionIndex + 1} / ${currentQuizData.length}`;
    questionTextEl.innerText = quiz.question;
    optionsContainerEl.innerHTML = '';
    const progressPercent = ((currentQuestionIndex) / currentQuizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerHTML = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const quiz = currentQuizData[currentQuestionIndex];
    const correctIndex = quiz.answer;
    const allOptions = Array.from(optionsContainerEl.children);
    allOptions.forEach(button => {
        button.disabled = true;
    });
    const progressPercent = ((currentQuestionIndex + 1) / currentQuizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play();
        allOptions[selectedIndex].classList.add('correct');
        let feedbackHTML = `<strong>正解！</strong><br>${quiz.explanation}`;
        if (quiz.refId) {
            feedbackHTML += `<a href="reference.html?from=quiz#${quiz.refId}" class="detail-link-btn">参考書で詳しく見る</a>`;
        }
        feedbackAreaEl.innerHTML = feedbackHTML;
        feedbackAreaEl.className = 'feedback-area correct';
    } else {
        incorrectSound.play();
        allOptions[selectedIndex].classList.add('incorrect');
        allOptions[correctIndex].classList.add('correct');
        let feedbackHTML = `<strong>不正解...</strong><br>${quiz.explanation}`;
        if (quiz.refId) {
            feedbackHTML += `<a href="reference.html?from=quiz#${quiz.refId}" class="detail-link-btn">参考書で詳しく見る</a>`;
        }
        feedbackAreaEl.innerHTML = feedbackHTML;
        feedbackAreaEl.className = 'feedback-area incorrect';
    }
    feedbackAreaEl.style.display = 'block';
    nextBtn.style.display = 'block';
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreTextEl.innerHTML = `${score}<small>/${currentQuizData.length}問</small>`; // innerHTMLに変更
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