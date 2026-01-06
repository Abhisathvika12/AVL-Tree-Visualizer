let searchedValue = null;

async function insert() {
    searchedValue = null;
    const value = document.getElementById("value").value;

    const res = await fetch("/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value })
    });

    drawTree(await res.json());
}

async function removeNode() {
    searchedValue = null;
    const value = document.getElementById("value").value;

    const res = await fetch("/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value })
    });

    drawTree(await res.json());
}

async function search() {
    searchedValue = Number(document.getElementById("value").value);

    const res = await fetch("/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: searchedValue })
    });

    const data = await res.json();
    document.getElementById("result").innerText =
        data.found ? "Node Found" : "Node Not Found";
}

function drawTree(tree) {
    const svg = document.getElementById("treeSvg");
    svg.innerHTML = "";
    drawNode(svg, tree, 450, 40, 200);
}

function drawNode(svg, node, x, y, offset) {
    if (!node) return;

    if (node.left) {
        drawLine(svg, x, y, x - offset, y + 80);
        drawNode(svg, node.left, x - offset, y + 80, offset / 2);
    }

    if (node.right) {
        drawLine(svg, x, y, x + offset, y + 80);
        drawNode(svg, node.right, x + offset, y + 80, offset / 2);
    }

    drawCircle(svg, x, y, node.value);
}

function drawCircle(svg, x, y, value) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 18);

    if (value === searchedValue) {
        circle.classList.add("found");
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.textContent = value;

    svg.appendChild(circle);
    svg.appendChild(text);
}

function drawLine(svg, x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1 + 18);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2 - 18);
    svg.appendChild(line);
}
