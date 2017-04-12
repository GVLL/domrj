import constants
test_filename = 'data/Diário Oficial_files/load_tree.html'


def assemble_from_html():
    root = treeparser.parse_tree(test_filename)
    #DEBUG
    #treeparser.traverse(root)
    options = {
        'dpi': constants.EMPIRIC_DPI
    }
    list_links = []
    treeparser.traverse(root.children[0])
    for top in root.children:
        links = treeparser.select_links(top)
        links = [printprefix + l.split('?')[-1] for l in links]
        # print(links)
        folder = os.path.join(results_dir, str(top))
        # print(folder)
        if not os.path.isdir(folder):
            os.mkdir(folder)
        pdfkit.from_url(links, os.path.join(folder, 'dom_rio_{}.pdf'.format(folder.split('/')[-1])), options=options)
