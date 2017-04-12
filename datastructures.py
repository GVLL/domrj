

class Node:
    """Basic Node data structure for use in the tree of topics """
    def __init__(self, data, children=None, order=0):
        self.data = data
        if children is None:
            self.children = []
        else:
            self.children = children
        self.order = order

    def __repr__(self):
        return str(self.data)

    def add_child(self, child):
        self.children.append(child)

    def isleaf(self):
        if self.children:
            return False
        return True
