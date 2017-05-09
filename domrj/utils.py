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

from domrj import dom_urls, dom_tokens
from robobrowser import RoboBrowser


def get_id_from_url(url)->str:
    if dom_urls.base_domain not in url:
        return None
    # http://doweb.rio.rj.gov.br/visualizar_pdf.php?edi_id=3380&page=1
    segments = url.split('?')
    # ['http://doweb.rio.rj.gov.br/visualizar_pdf.php', 'edi_id=3380&page=1']
    params = segments[-1].split('&')
    # ['edi_id=3380', 'page=1']
    idsegment = [x for x in params if dom_tokens.ID in x][0]
    # 'edi_id=3380'
    diary_id = idsegment.split('=')[-1]
    return diary_id

def get_numpages_from_id(edit_id, menu_url=dom_urls.menu_url)->str:
    browser = RoboBrowser()
    browser.open(menu_url.format(edit_id))
    tr_tag = browser.find('tr')
    numpages = len(tr_tag.find_all('option'))
    return numpages

def today_str(op_text):
    #<option value="3397">07/04/2017 - Nº 18(Supl.)</option>
    segments = op_text.split('-')
    date_segment = segments[0]
    date = date_segment.split('>')[-1]
    date = date.strip()
    segments = date.split('/')
    date = '{}-{}-{}'.format(segments[2], segments[1], segments[0])
    return date

def is_suplement(op_text):
    segments = op_text.split('-')
    sup_segment = segments[1]
    supl = False
    if 'Supl' in sup_segment:
        supl = True
    return supl
