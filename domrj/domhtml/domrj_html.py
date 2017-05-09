# Copyright 2017 Gabinete do Vereador Leandro Lyra
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

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
