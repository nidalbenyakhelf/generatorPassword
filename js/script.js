const inputBox = document.getElementById("inputBox");
const range = document.getElementById("range");
const passwordLengthValue = document.getElementById("passwordLengthValue");
const condation = document.getElementById("condation");
const Lletter = document.getElementById("Lletter");
const Uletter = document.getElementById("Uletter");
const number = document.getElementById("number");
const symbols = document.getElementById("symbols");
const generatorBtn = document.getElementById("generatorBtn");

const LletterGoroup = ['a','b','c','d','e','f','j','h','i','g','k','l','m','n','o','p','q','r','s','t','v','w','y','z'];
const UletterGoroup = ['A','B','C','D','E','F','J','H','I','G','K','L','M','N','O','P','Q','R','S','T','V','W','Y','Z'];
const numberGroup = ['0','1','2','3','4','5','6','7','8','9'];
const symbolsGoroup = [')','(','*','&','^','%','$','#','@','!'];

const idgroup = ['Lletter']; // نبدأ بأن الحروف الصغيرة مفعلة افتراضياً
let isLletter = true; 
let isUletter = false; 
let isNumber = false; 
let isSymbols = false;

Lletter.innerText = '✔';
inputBox.addEventListener('click',(e)=>{
    let textToCopy=e.target.innerText;
     navigator.clipboard.writeText(textToCopy)
    setTimeout(()=>{
        inputBox.style.cursor='wait';
    },100)
    inputBox.style.cursor='none';
});
// نظام إدارة الضغط على الشروط الخاص بك مع تصحيح بسيط لاسم الـ ID (symbols بدلاً من Sympols)
condation.addEventListener("click", (e) => {
    let targetId = e.target.id;
    
    // التأكد من أن الضغط تم على أحد العناصر المطلوبة
    if (targetId !== 'Lletter' && targetId !== 'Uletter' && targetId !== 'number' && targetId !== 'symbols') {
        return;
    }

    if (e.target.innerText === '✔' && idgroup.length > 1) {
        e.target.innerText = '';
        const index = idgroup.indexOf(targetId);
        if (index > -1) idgroup.splice(index, 1);
        updateStatus(targetId, false);
        return;
    }

    if (e.target.innerText !== '✔') {
        e.target.innerText = '✔';
        if (!idgroup.includes(targetId)) {
            idgroup.push(targetId);
        }
        updateStatus(targetId, true);
    }
});

// دالة لتحديث حالة المتغيرات بناءً على الاختيار
function updateStatus(id, status) {
    switch (id) {
        case "Lletter": isLletter = status; break;
        case "Uletter": isUletter = status; break;
        case "number": isNumber = status; break;
        case "symbols": isSymbols = status; break; // تم تصحيحها لتطابق الـ ID الصحيح
    }
}

range.addEventListener('input', () => {
    passwordLengthValue.innerText = range.value;
});

// خوارزمية التوليد باستخدام فكرتك الأساسية (اختيار مجموعة عشوائية ثم عنصر منها)
generatorBtn.addEventListener('click', () => {
    let activeGroups = [];

    if (isLletter) activeGroups.push(LletterGoroup);
    if (isUletter) activeGroups.push(UletterGoroup);
    if (isNumber) activeGroups.push(numberGroup);
    if (isSymbols) activeGroups.push(symbolsGoroup);

    if (activeGroups.length === 0) {
        alert("الرجاء اختيار خيار واحد على الأقل!");
        return;
    }

    const passwordWord = [];
    for (let i = 0; i <= range.value - 1; i++) {
        // 1. اختيار مجموعة عشوائية من المجموعات التي حددها المستخدم بـ ✔
        let randomGroupIndex = Math.floor(Math.random() * activeGroups.length);
        let chosenGroup = activeGroups[randomGroupIndex];

        // 2. اختيار عنصر عشوائي داخل تلك المجموعة
        let randomCharIndex = Math.floor(Math.random() * chosenGroup.length);
        
        passwordWord[i] = chosenGroup[randomCharIndex];
    }

    // دمج جميع الحروف الناتجة في نص واحد متصل
    let finalPassword = passwordWord.join('');

    // وضع كلمة المرور كاملة داخل حقل الإدخال دفعة واحدة
    if (inputBox.tagName === 'INPUT') {
        inputBox.value = finalPassword;
    } else {
        inputBox.innerText = finalPassword;
    }
    
    console.log(finalPassword);
});