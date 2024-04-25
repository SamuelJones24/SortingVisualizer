class TreeNode {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
 let nodes = [];

function calculateNodePositions(level) {
    const verticalSpacing = 500 * (1 / level);
    const nodeSize = 500 * (1 / Math.pow(level, 2.2));
    const positions = [];

    for (let i = 0; i < level; i++) {
        const numNodes = Math.pow(2, i);
        const startX = (window.innerWidth - numNodes * nodeSize - (numNodes - 1) * horizontalSpacing(i)) / 2;

        for (let j = 0; j < numNodes; j++) {
            const x = startX + j * (nodeSize + horizontalSpacing(i));
            const y = i * verticalSpacing + nodeSize;
            positions.push({ x, y, size: nodeSize });
        }
    }

    return positions;
}

function horizontalSpacing(level) {
    const baseSpacing = 800;
    return baseSpacing / Math.pow(2, level);
}



function createNodes(positions) {
    const container = document.getElementById('tree-container');
    container.innerHTML = '';

    positions.forEach((position, index) => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = index + 1;

        node.style.left = position.x - position.size + 'px';
        node.style.top = position.y - position.size + 'px';
        node.style.width = node.style.height = position.size * 2 + 'px';
        node.style.fontSize = position.size / 2 + 'px';
        container.appendChild(node);
    });
}

function updateTree(nodes) {
    const level = parseInt(document.getElementById('level-slider').value);
    const positions = calculateNodePositions(level);
    nodes.length = 0; 
    const root = createTreeNode(1, positions[0]);
    nodes.push(root);
    createSubtree(root, 1, level - 1, positions, nodes);
    createNodes(positions);
    document.getElementById('levelVal').innerText = level;
    document.getElementById('NodeNums').innerText = Math.pow(2, level) - 1;
}

function createSubtree(parent, startValue, level, positions, nodes) {
    if (level <= 0) {
        return;
    }
    const leftValue = startValue * 2;
    const leftChild = createTreeNode(leftValue, positions[leftValue - 1]);
    console.log('Left child value:', leftChild.value); // Log the value of the left child node
    parent.left = leftChild;
    nodes.push(leftChild);

    const rightValue = leftValue + 1;
    const rightChild = createTreeNode(rightValue, positions[rightValue - 1]);
    console.log('Right child value:', rightChild.value); // Log the value of the right child node
    parent.right = rightChild;
    nodes.push(rightChild);

    createSubtree(leftChild, leftValue, level - 1, positions, nodes);
    createSubtree(rightChild, rightValue, level - 1, positions, nodes);
}



function createTreeNode(value, position) {
    const node = new TreeNode(value);
    node.position = position;
    return node;
}


updateTree(nodes);
const slider = document.getElementById('level-slider');
let time = 10000 / Math.pow(2, slider.value)
slider.addEventListener('input', () =>{
    time = 10000 / Math.pow(2, slider.value)
    updateTree(nodes)
});
document.getElementById("depth").addEventListener("click", () => {
    root = nodes[0];
    console.log(time)
    dfs(root);
});
document.getElementById("breadth").addEventListener("click", () => {
    root = nodes[0];
    bfs(root);
});






function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }


function highlight(indices, color){
    let nodes = document.querySelectorAll('.node');
    indices.forEach(i => {
        if (nodes[i]) {
            nodes[i].style.backgroundColor = color;
        }
    });
}

async function dfs(node){
    if (!node) {
        return;
    }
    highlight([node.value-1], 'red')
    console.log(node.value)
    await sleep(time);
    
    await dfs(node.left)
    await dfs(node.right)
    highlight([node.value-1], 'rgb(77, 102, 100)')
}

async function bfs(root) {
    if (!root) return;

    const queue = []; 
    queue.push(root); 

    while (queue.length > 0) {
        const currentNode = queue.shift(); 
        if (!currentNode) continue; 

        console.log(currentNode.value);
        highlight([currentNode.value - 1], 'red'); 

        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);

        await sleep(time);
        
        highlight([currentNode.value - 1], 'rgb(77, 102, 100)');
    }
}