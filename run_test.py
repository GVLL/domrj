from dompdf import domrj_pdf


if __name__ == '__main__':
    print('URL test')
    print(domrj_pdf.download_url_from_raw_url('http://doweb.rio.rj.gov.br/visualizar_pdf.php?edi_id=3396&page=1'))
    print('Download test')
    print(domrj_pdf.download_from_raw_url('http://doweb.rio.rj.gov.br/visualizar_pdf.php?edi_id=3386&page=1', 'DOMRJ_3386.pdf'))
    print('Test Download range of pages')
    domrj_pdf.assemble_from_pages('http://doweb.rio.rj.gov.br/visualizar_pdf.php?edi_id=3390&page=1', 'DOMRJ_3390_14-30.pdf', tmpdir=None, begin=14, end=30)
