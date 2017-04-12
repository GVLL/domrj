# DO Fácil RJ
Facilitador de leitura do Diário Oficial do Município do Rio de Janeiro


[Weasyprint](http://weasyprint.readthedocs.io/en/latest/tutorial.html) pode ser uma alternativa ao [pdfkit](https://pypi.python.org/pypi/pdfkit) por não precisar instalar o wkhtmltopdf.

### Dependências

Listadas em *requirements.txt*

### Por que este projeto é importante?

O Diário Oficial do Município do Rio de Janeiro pode ser visualizado no endereço oficial http://doweb.rio.rj.gov.br. Contudo, excetuando-se as 10 últimas edições, disponíveis no campo
"ÚLTIMAS EDIÇÕES", não é possível obter um arquivo único do Diário. O site oficial oferece uma interface de visualização de PDF e uma de visualização HTML. Na interface de visualização de PDF,
exibe-se apenas uma única página por vez e a função pesquisar (Ctrl + F) não funciona. Na interface de visualização HTML, temos uma árvore de tópicos que segmenta o Diário de uma maneira bem interessante, mas ainda não podemos fazer uma busca em todo o seu conteúdo, é necessário abrir página por página.
não funciona.

Este projeto possibilita a obtenção de um arquivo PDF único e pesquisável para cada edição do Diário Oficial do Município do Rio de Janeiro.

Incentiva-se a comunidade a contribuir para que ele possa ir mais além, incorporando, por exemplo, funcionalidades que permitam o acompanhamento de áreas e atos específicos do governo de forma automatizada.

### Versão do PDF





### Versão do HTML

Adicionalmente, é possível gerar o Diário Oficial do Município do Rio a partir da visualização em html disponível no [site oficial](http://doweb.rio.rj.gov.br).

A versão html não possui as imagens e detalhes visuais da versão pdf, porém apresenta uma estrutura de tópicos segmentada de acordo com os assuntos e órgãos do poder executivo municipal.
Esta versão pode ser utilizada para processamentos mais elaborados dentro do D.O. como, por exemplo, a busca automatizada por atos administrativos específicos.

Esta funcionalidade carece de implementação, contudo já há uma implementação do *parser* da árvore de tópicos do diário.
