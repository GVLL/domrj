class DOSection:
    def __init__(self, title, begin, end, date=None):
        self.title = title
        self.begin = begin
        self.end = end
        self.date = date

    def __repr__(self):
        if self.date:
            return '{} Pages {} - {} ({})'.format(self.title, self.begin, self.end, self.date)
        return '{} Pages {} - {}'.format(self.title, self.begin, self.end)
