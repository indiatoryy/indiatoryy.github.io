(function () {
  var projects = [
    {
      title: 'Homeless Shelter Resource Allocation',
      image: '/assets/img/shelter-prediction.png',
      imageAlt: 'Homeless shelter resource allocation',
      summary: 'A machine learning solution for homeless shelter resource allocation, developed with Borealis AI.',
      technologies: 'Python · Machine Learning · Data Analysis',
      details: [
        'Developed an ML solution to improve resource allocation & decision-making for homeless shelters.',
        'Explored data-driven approaches to better understand shelter demand and support efficient resource usage.'
      ],
      github: 'https://github.com/indiatoryy/toronto-shelter-demand'
    },
    {
      title: 'Age Recognition',
      image: '/assets/img/age_project.png',
      imageAlt: 'Age recognition',
      summary: 'A computer vision model for estimating age from facial images.',
      technologies: 'Python · Computer Vision · Machine Learning',
      details: [
        'Developed a computer vision model for estimating age from facial images.',
        'Explored image processing and ML techniques to build and evaluate an age recognition system.'
      ],
      github: 'https://github.com/indiatoryy/Age-Detection-From-Image'
    },
    {
      title: 'Financial Market Modelling',
      image: '/assets/img/finance_project.png',
      imageAlt: 'Financial market modelling',
      summary: 'Statistical and machine learning approaches for modelling financial market data.',
      technologies: 'Python · pandas · scikit-learn · Statistical Modelling',
      details: [
        'Explored statistical and machine learning approaches for modelling and forecasting movements in financial market data.'
      ]
    },
    {
      title: 'Homeless Shelter Resource Allocation',
      image: '/assets/img/shelter-prediction.png',
      imageAlt: 'Homeless shelter resource allocation',
      summary: 'A machine learning solution for homeless shelter resource allocation, developed with Borealis AI.',
      technologies: 'Python · Machine Learning · Data Analysis',
      details: [
        'Developed an ML solution to improve resource allocation & decision-making for homeless shelters.',
        'Explored data-driven approaches to better understand shelter demand and support efficient resource usage.'
      ],
      github: 'https://github.com/indiatoryy/toronto-shelter-demand'
    }
  ];

  var INITIAL_COUNT = 2;
  var shownCount = 0;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createProjectCard(project) {
    var detailsHtml = project.details.map(function (detail) {
      return '<li>' + escapeHtml(detail) + '</li>';
    }).join('');

    var githubHtml = '';
    if (project.github) {
      githubHtml =
        '<div class="card-action">' +
          '<a aria-label="Visit the GitHub repo for ' + escapeHtml(project.title) + '"' +
            ' href="' + escapeHtml(project.github) + '" target="_blank"' +
            ' data-position="top" data-tooltip="View Source"' +
            ' class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped">' +
            '<i class="fa fa-github"></i>' +
          '</a>' +
        '</div>';
    }

    var col = document.createElement('div');
    col.className = 'col s12 m6 l4';
    col.innerHTML =
      '<div class="card medium">' +
        '<div class="card-image waves-effect waves-block waves-light">' +
          '<img alt="' + escapeHtml(project.imageAlt) + '" src="' + escapeHtml(project.image) + '"' +
            ' style="height: 100%; width: 100%" class="activator" />' +
        '</div>' +
        '<div class="card-content">' +
          '<span class="card-title activator purple-text hoverline">' + escapeHtml(project.title) +
            '<i class="mdi-navigation-more-vert right"></i></span>' +
          '<p>' + escapeHtml(project.summary) + '</p>' +
        '</div>' +
        '<div class="card-reveal">' +
          '<span class="card-title grey-text"><small>Accomplishments</small>' +
            '<i class="mdi-navigation-close right"></i></span>' +
          '<ul>' +
            '<li><b>Technologies:</b> ' + escapeHtml(project.technologies) + '</li>' +
            detailsHtml +
          '</ul>' +
          githubHtml +
        '</div>' +
      '</div>';

    return col;
  }

  function renderProjects(projectList) {
    var container = document.getElementById('projects-list');
    projectList.forEach(function (project) {
      container.appendChild(createProjectCard(project));
    });
  }

  function updateLoadMoreButton() {
    var button = document.getElementById('load-more-projects');
    if (!button) return;

    if (shownCount >= projects.length) {
      button.hidden = true;
      button.disabled = true;
    }
  }

  function showProjects(count) {
    var nextProjects = projects.slice(shownCount, shownCount + count);
    renderProjects(nextProjects);
    shownCount += nextProjects.length;
    updateLoadMoreButton();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('load-more-projects');
    showProjects(INITIAL_COUNT);

    if (!button) return;

    button.addEventListener('click', function () {
      showProjects(projects.length - shownCount);
    });
  });
})();
