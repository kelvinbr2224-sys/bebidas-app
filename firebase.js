// ========== CONFIGURAÇÃO FIREBASE ==========
const firebaseConfig = {
  apiKey: "AIzaSyAzar6G1ulXpHhj0XeDZEk2IbolZ_cmCPM",
  authDomain: "bebidas-app-11489.firebaseapp.com",
  projectId: "bebidas-app-11489",
  storageBucket: "bebidas-app-11489.firebasestorage.app",
  messagingSenderId: "248743525982",
  appId: "1:248743525982:web:ee94a5343e16646fa17ecf",
  measurementId: "G-K1JC5WHHD1"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Atalhos globais
const auth = firebase.auth();
const db = firebase.firestore();

// ========== FUNÇÕES AUXILIARES ==========

// Verifica se o usuário está logado; se não, redireciona para login
function exigirLogin() {
  auth.onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

// Faz logout e volta para o login
function sair() {
  auth.signOut().then(function() {
    window.location.href = "index.html";
  });
}

// Formata preço em Real
function formatarPreco(valor) {
  return "R$ " + Number(valor).toFixed(2).replace(".", ",");
}

// Mostra uma notificação rápida (toast)
function mostrarToast(mensagem, tipo) {
  const toast = document.createElement("div");
  toast.textContent = mensagem;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: ${tipo === "erro" ? "#c0392b" : "#27ae60"};
    color: white;
    padding: 14px 24px;
    border-radius: 10px;
    font-weight: bold;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 99999;
  `;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.remove();
  }, 3000);
}