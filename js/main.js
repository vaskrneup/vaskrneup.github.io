import {RenderProjectBodyAsTable} from "./project/renderer.js";
import {filterProjects, sortProjects} from "./project/filter.js";

// =====================================================================================
// VARS !!
// =====================================================================================s
export const projectData = [
    {
        pk: "PK_10",
        date: new Date(2021, 0, 22),
        title: "Google Sheets Clone",
        assignmentType: "FINAL PROJECT",
        demo: {
            url: "https://vaskrneup.github.io/GoogleSheetsClone",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/GoogleSheetsClone",
            text: "Review Code"
        }
    },
    {
        pk: "PK_9",
        date: new Date(2021, 0, 20),
        title: "Flappy Bird",
        assignmentType: "JS GAME",
        demo: {
            url: "https://vaskrneup.github.io/FlappyBird",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/FlappyBird",
            text: "Review Code"
        }
    },
    {
        pk: "PK_8",
        date: new Date(2021, 0, 19),
        title: "JS Car Game",
        assignmentType: "JS GAME",
        demo: {
            url: "https://vaskrneup.github.io/JsCarGame",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/JsCarGame",
            text: "Review Code"
        }
    },
    {
        pk: "PK_7",
        date: new Date(2021, 0, 18),
        title: "Js Ball Collision",
        assignmentType: "JS BALL COLLISION",
        demo: {
            url: "https://vaskrneup.github.io/JsBouncyBall/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/JsBouncyBall",
            text: "Review Code"
        }
    },
    {
        pk: "PK_6",
        date: new Date(2021, 0, 16),
        title: "Js Slider 1 & 2",
        assignmentType: "JS Slider",
        demo: {
            url: "https://vaskrneup.github.io/JsSlider/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/JsSlider",
            text: "Review Code"
        }
    },
    {
        pk: "PK_5",
        date: new Date(2021, 0, 11),
        title: "Js Basics Assignment",
        assignmentType: "JS BASICS",
        demo: {
            url: "https://vaskrneup.github.io/JSAssignment/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/JSAssignment",
            text: "Review Code"
        }
    },
    {
        pk: "PK_4",
        date: new Date(2021, 0, 11),
        title: "Design Final Project",
        assignmentType: "DESIGN FINAL PROJECT",
        demo: {
            url: "https://vaskrneup.github.io/DesignFinalProject/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/DesignFinalProject",
            text: "Review Code"
        }
    },
    {
        pk: "PK_3",
        date: new Date(2021, 0, 6),
        title: "Responsive 1-A home-search",
        assignmentType: "RESPONSIVE HTML & CSS",
        demo: {
            url: "https://vaskrneup.github.io/ResponsiveTuTangle/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/ResponsiveTuTangle",
            text: "Review Code"
        }
    },
    {
        pk: "PK_2",
        date: new Date(2021, 0, 4),
        title: "1-A home-search",
        assignmentType: "HTML & CSS BOXING DIVS",
        demo: {
            url: "https://vaskrneup.github.io/TuTangle/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/TuTangle",
            text: "Review Code"
        }
    },
    {
        pk: "PK_1",
        date: new Date(2021, 0, 3),
        title: "Assignment Page",
        assignmentType: "HTML, CSS & JS",
        demo: {
            url: "https://vaskrneup.github.io/",
            text: "Demo"
        },
        repository: {
            url: "https://github.com/vaskrneup/vaskrneup.github.io",
            text: "Review Code"
        }
    },
];
export const sortMapper = {
    date: "dec",
    title: "dec",
    assignmentType: "dec",
    demo: "dec",
    repository: "dec"
}
export let activeProjectData = projectData;
// =====================================================================================
// END VARS !!
// =====================================================================================


// =====================================================================================
// UTILITY FUNC !!
// =====================================================================================
function createMockData({n = 100}) {
    for (let i = n; i > 1; i--) {
        projectData.push({
            pk: "PK " + i.toString(), // PK: Project Key 😂
            date: new Date(2021, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)),
            title: (Math.random() * 100000).toString(),
            assignmentType: "Random Project-" + Math.floor(Math.random() * 1000000).toString(),
            demo: {
                url: "https://vaskrneup.github.io/test-project/" + Math.floor(Math.random() * 1000000).toString(),
                text: "Demo" + Math.floor(Math.random() * 1000000).toString()
            },
            repository: {
                url: "https://github.com/vaskrneup/test-project" + Math.floor(Math.random() * 1000000).toString(),
                text: "Review Code" + Math.floor(Math.random() * 1000000).toString()
            }
        });
    }
}

const updateSortMapper = ({name}) => {
    sortMapper[name] = sortMapper[name] === "asc" ? "dec" : "asc";
}

// createMockData({n: 100});
// =====================================================================================
// END UTILITY FUNC !!
// =====================================================================================

// =====================================================================================
// SUPPORTER FUNCTIONS !!
// =====================================================================================
const updateSortedTable = ({column}) => {
    updateSortMapper({name: column});

    renderProjectTable(
        sortProjects({
            projectData: activeProjectData,
            field: column,
            order: sortMapper[column]
        })
    );
}
// =====================================================================================
// END SUPPORTER FUNCTIONS !!
// =====================================================================================


// =====================================================================================
// HANDLE DOM EVENTS !!
// =====================================================================================
// For search and filter feature !!
document.getElementById("additional-feature__form").onsubmit = function (e) {
    e.preventDefault();
    const filterText = document.getElementById("filter-input").value;

    activeProjectData = filterProjects({
        projectData: projectData, keyword: filterText
    });

    renderProjectTable(activeProjectData);
};
// END search and filter feature !!

// For sort feature !!
document.getElementById("table__date").onclick = () => updateSortedTable({column: "date"});
document.getElementById("table__title").onclick = () => updateSortedTable({column: "title"});
document.getElementById("table__assignmentType").onclick = () => updateSortedTable({column: "assignmentType"});
document.getElementById("table__demo").onclick = () => updateSortedTable({column: "demo"});
document.getElementById("table__repository").onclick = () => updateSortedTable({column: "repository"});
// END sort feature !!

// =====================================================================================
// END HANDLE DOM EVENTS !!
// =====================================================================================


function renderProjectTable(data) {
    let tableMessage = "";

    if (projectData.length === 0) tableMessage = "Seems like no project is started.";
    else if (activeProjectData.length === 0) tableMessage = "No project matches your filter.";

    document.getElementById("project-table__message").innerText = tableMessage;
    document.getElementById("project-table").innerHTML = RenderProjectBodyAsTable({
        projectData: data
    });
}

// =====================================================================================
// HANDLE INITIAL EVENTS, TO LOAD DATA !!
// =====================================================================================
// load table with all data initially !!
renderProjectTable(activeProjectData);
// =====================================================================================
// END HANDLE INITIAL EVENTS, TO LOAD DATA !!
// =====================================================================================