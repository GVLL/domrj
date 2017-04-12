from domrj.datastructures import Node
import dom_tokens


treeids = {}

def parse_internalnode(line, codetable=treeids):
    #c2811 = gFld("DECRETOS N", "javascript:parent.op()");
    segments = line.split('=')
    #['c2811 ', ' gFld("DECRETOS N", "javascript:parent.op()");']
    code = segments[0].strip()
    name = segments[1].split(',')[0].split('"')[1]
    node = Node(name)
    codetable[code] = node

def parse_leaf(line, codetable=treeids):
    #c2811.addChild(["DECRETO RIO N� 42952", "mostrar.htm?id=405397&edi_id=3383"]);
    segments = line.split('",')
    #['c2811.addChild(["DECRETO RIO N� 42952', '"mostrar.htm?id=405397&edi_id=3383"]);']
    left = segments[0]
    #'c2811.addChild(["DECRETO RIO N� 42952'
    parent_code = left.split('.')[0]
    name = left.split('"')[1]
    #'"mostrar.htm?id=405397&edi_id=3383"]);'
    sufix_url = segments[1].split('"')[1]
    child_node = Node((name, sufix_url))
    parent = codetable[parent_code]
    #print(parent, child_node, codetable)
    parent.add_child(child_node)
    #print(parent, child_node, codetable)
    #print(parent, parent.children)

def add_children(line, codetable=treeids):
    #c6512.addChildren([c6552,c6553,c6554,c6825,c5383]);
    segments = line.split('.')
    #['c6512', 'addChildren([c6552,c6553,c6554,c6825,c5383]);']
    parent_code = segments[0]
    codes_str = segments[1].split('[')[1]
    #['c6552,c6553,c6554,c6825,c5383', ']);']
    codes_str = codes_str.split(']')[0]
    #'c6552,c6553,c6554,c6825,c5383'
    children_codes = codes_str.split(',')
    #['c6552','c6553','c6554','c6825','c5383']
    # print(parent_code, children_codes)
    try:
        parent = codetable[parent_code]

        for child in children_codes:
            parent.add_child(codetable[child])

    except Exception as e:
        print(e)
        print('One or more codes are missing in the lookup table:\n', codetable)

def parse_tree(filename):
    print(filename)
    with open(filename, encoding=EMPIRIC_ENCODING) as treefile:
        line = treefile.readline()
        while line != '':
            if dom_tokens.INTERNALNODE_INDICATOR in line:
                parse_internalnode(line, treeids)
            elif dom_tokens.LEAF_INDICATOR in line:
                parse_leaf(line, treeids)
            elif dom_tokens.RELATIONSHIP_INDICATOR in line:
                add_children(line, treeids)
            #print(treeids)
            line = treefile.readline()
    root = treeids[dom_tokens.ROOT_ID]

    return root

def traverse(root, level=0):
    indent = ' '*4*level
    print('{}{}'.format(indent, root))
    for child in root.children:
        traverse(child, level + 1)

def select_links(root, links=None):
    if links is None:
        links = []
    for child in root.children:
        if child.isleaf():
            links.append(child.data[1])
        else:
            select_links(child, links)
    return links
