// Seleciona o elemento HTML com a classe "mario"
const mario = document.querySelector(".mario");

// Seleciona o elemento HTML com a classe "pipe"
const pipe = document.querySelector(".pipe");

// Função para pausar a animação da nuvem
function pauseCloudAnimation() {
  const clouds = document.querySelector(".clouds");
  clouds.style.animation = "none";
}

// Função para escurecer gradualmente a tela
function darkenScreen() {
  // Cria um elemento overlay para escurecer a tela
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  let opacity = 0;
  const interval = setInterval(() => {
    // Aumenta gradativamente a opacidade do overlay
    opacity += 0.01;
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    // Quando a opacidade atinge 0.5, interrompe o intervalo
    if (opacity >= 0.5) {
      clearInterval(interval);
    }
  }, 10);
}

// Função para exibir a tela de "Game Over"
function showGameOverScreen() {
  // Obtém o elemento da tela de "Game Over" e o exibe centralizado
  const gameOverScreen = document.getElementById("game-over");
  gameOverScreen.style.display = "flex";
}

// Define a função para fazer o Mario pular
const jump = () => {
    mario.classList.add("jump");
  
    // Remove a classe "jump" após 750ms para terminar a animação de pulo
    setTimeout(() => {
      mario.classList.remove("jump");
    }, 750);
  };

  // Adiciona um ouvinte de evento para o evento "keydown" (tecla pressionada) que chama a função "jump"
document.addEventListener("keydown", jump);

// Inicia um loop a cada 10ms para verificar a colisão do Mario com o cano
const loop = setInterval(() => {
    // Obtém a posição do cano
    const pipePosition = pipe.offsetLeft;
  
    // Obtém a posição vertical do Mario
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  
    // Verifica se o Mario colidiu com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 75) {
      // Pausa as animações do cano e do Mario
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;
      
      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
  
      // Muda a imagem do Mario para a de "Game Over"
      mario.src = "images/died.png";
      mario.style.width = "78px";
      mario.style.marginLeft = "50px";
  
      // Pausa a animação da nuvem
      pauseCloudAnimation();
  
      // Atraso de 500ms antes de escurecer a tela gradualmente
      setTimeout(() => {
          darkenScreen(); // Escurece a tela
      }, 500);
  
      // Atraso de 1000ms antes de exibir a tela de "Game Over"
      setTimeout(() => {
          showGameOverScreen(); // Exibe a tela de "Game Over"
      }, 1000);
  
      // Limpa o loop para evitar execuções contínuas
      clearInterval(loop);
    }
  }, 10);

// Função para recomeçar o jogo recarregando a página
function restartGame() {
  // Recarrega a página
  location.reload();
}
