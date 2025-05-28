document.getElementById("refresh").addEventListener("click", buscarRepositorio);

async function buscarRepositorio() {
  const lenguaje = document.getElementById("language").value;
  const card = document.getElementById("card");
  card.classList.add("hidden");

  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=language:${lenguaje}&sort=stars&order=desc&per_page=50`);

    if (res.status === 403) {
      alert("Has alcanzado el límite de consultas de la API de GitHub. Intenta de nuevo más tarde.");
      return;
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      alert("No se encontraron repositorios.");
      return;
    }

    const repo = data.items[Math.floor(Math.random() * data.items.length)];

    document.getElementById("repo-name").textContent = repo.name;
    document.getElementById("repo-desc").textContent = repo.description || "Sin descripción disponible.";
    document.getElementById("repo-lang").textContent = repo.language || lenguaje;
    document.getElementById("repo-stars").textContent = repo.stargazers_count;
    document.getElementById("repo-forks").textContent = repo.forks_count;
    document.getElementById("repo-issues").textContent = repo.open_issues_count;
    document.getElementById("repo-link").href = repo.html_url;

    card.classList.remove("hidden");

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al obtener datos del repositorio.");
  }
}
