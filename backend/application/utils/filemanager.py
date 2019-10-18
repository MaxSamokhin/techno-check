import hashlib
import os
from datetime import datetime
from application import settings


def generate_filename(file):
    """generates name based on original name + some magic"""
    m = hashlib.md5()
    filename, file_extension = os.path.splitext(file.name)
    name = filename + datetime.now().strftime("%Y:%m:%d:%H:%M:%S:%f")
    m.update(name.encode('utf-8'))
    return f'{m.hexdigest()}{file_extension}'


def save_tmp_file(in_memory_file):
    """Saves InMemoryFile in tmp_dir and returns path to file"""
    path = f'{settings.TMP_PATH}{generate_filename(in_memory_file)}'
    with open(path, 'w') as f:
        f.write(in_memory_file.read().decode('utf-8'))
    return path


def iter_tmp_file(path, delete=True):
    """Reads tmp file and deletes it"""
    with open(path, 'r') as f:
        for line in f.readlines():
            # remove new line symbol
            yield line.replace('\n', '')
    if delete:
        os.remove(path)
