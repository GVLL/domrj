import os
import requests
import shutil
from domrj import constants, dom_urls, utils
from PyPDF2 import PdfFileMerger, PdfFileReader

def download_pages_from_id(edi_id, work_dir, begin=1, end=None):
    totalpages = utils.get_numpages_from_id(edi_id)
    if (end is None) or (totalpages < end) or (end < begin):
        # get the total number of pages of this edition
        end = totalpages
    if begin < 1:
        begin = 1
    for n in range(begin, end+1):
        # get the pdf file
        response = requests.get(dom_urls.page.format(edi_id, n))
        with open(os.path.join(work_dir, '{}.pdf'.format(n)), 'wb') as output:
            output.write(response.content)
        print('Page', n)

def download_pages_from_raw_url(raw_url, work_dir):
    download_pages_from_id(utils.get_id_from_url(raw_url), work_dir)

def assemble_pages_from_list(filename, pages_list, work_dir):
    merger = PdfFileMerger()
    for page in pages_list:
        with open(os.path.join(work_dir, page), 'rb') as pfile:
            merger.append(PdfFileReader(pfile))
    if not filename.endswith('.pdf'):
        filename = filename + '.pdf'
    # writes pdf file to disk
    merger.write(filename)
    print('Document written to {}'.format(filename))

def assemble_from_pages(raw_url, filename, tmpdir=None, begin=1, end=None)->str:
    # get the id of the required edition
    edi_id = utils.get_id_from_url(raw_url)

    if tmpdir is None:
        tmpdir = constants.TMPDIR
    work_dir = os.path.join(os.path.dirname(filename), tmpdir)

    try:
        os.mkdir(work_dir)
    except FileExistsError as e:
        print('There exists a file or directory named {}. Please, remove it or rename it to continue.'.format(tmpdir))
        exit()

    #download pages to tmp dir
    download_pages_from_id(edi_id, work_dir, begin, end)
    page_files = [f for f in os.listdir(work_dir) if f.endswith('.pdf')]
    # sort by integer order of the names (not lexicographic)
    page_files.sort(key=lambda f: int(f[0:f.index('.')]))
    # assembles pages into a whole pdf file
    assemble_pages_from_list(filename, page_files, work_dir)
    # removes tmp files
    shutil.rmtree(work_dir)

def download_url_from_id(edi_id):
    return dom_urls.download.format(edi_id)

def download_url_from_raw_url(raw_url):
    edi_id = utils.get_id_from_url(raw_url)
    return download_url_from_id(edi_id)

def download_from_id(edi_id, filename):
    download_url = download_url_from_id(edi_id)
    response = requests.get(download_url)
    with open(filename, 'wb') as output:
        output.write(response.content)
    print('Document written to {}'.format(filename))

def download_from_raw_url(raw_url, filename):
    download_from_id(utils.get_id_from_url(raw_url), filename)
