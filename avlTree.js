class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(n) {
        return n ? n.height : 0;
    }

    getBalance(n) {
        return n ? this.height(n.left) - this.height(n.right) : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    insertNode(node, value) {
        if (!node) return new Node(value);

        if (value < node.value)
            node.left = this.insertNode(node.left, value);
        else if (value > node.value)
            node.right = this.insertNode(node.right, value);
        else
            return node;

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);

        if (balance > 1 && value < node.left.value)
            return this.rightRotate(node);

        if (balance < -1 && value > node.right.value)
            return this.leftRotate(node);

        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    minValueNode(node) {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }

    deleteNode(root, value) {
        if (!root) return root;

        if (value < root.value)
            root.left = this.deleteNode(root.left, value);
        else if (value > root.value)
            root.right = this.deleteNode(root.right, value);
        else {
            if (!root.left || !root.right)
                root = root.left || root.right;
            else {
                const temp = this.minValueNode(root.right);
                root.value = temp.value;
                root.right = this.deleteNode(root.right, temp.value);
            }
        }

        if (!root) return root;

        root.height = 1 + Math.max(this.height(root.left), this.height(root.right));
        const balance = this.getBalance(root);

        if (balance > 1 && this.getBalance(root.left) >= 0)
            return this.rightRotate(root);

        if (balance > 1 && this.getBalance(root.left) < 0) {
            root.left = this.leftRotate(root.left);
            return this.rightRotate(root);
        }

        if (balance < -1 && this.getBalance(root.right) <= 0)
            return this.leftRotate(root);

        if (balance < -1 && this.getBalance(root.right) > 0) {
            root.right = this.rightRotate(root.right);
            return this.leftRotate(root);
        }

        return root;
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    search(node, value) {
        if (!node) return false;
        if (node.value === value) return true;
        return value < node.value
            ? this.search(node.left, value)
            : this.search(node.right, value);
    }

    toObject(node = this.root) {
        if (!node) return null;
        return {
            value: node.value,
            left: this.toObject(node.left),
            right: this.toObject(node.right)
        };
    }
}

module.exports = AVLTree;
