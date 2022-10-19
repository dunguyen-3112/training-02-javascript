
from multiprocessing.dummy import Array
import os
import numpy as np
import json

from pandas import array
lastNames = ['Hoa', 'Ngan', 'Hong', 'Thuy',
             'Lan', 'Tuan', 'Vu', 'Khanh', 'Vinh', 'Trong', 'Hung', 'Thu', 'Xuan', 'Hoang', 'Duc', 'Khoi', 'Nhan', 'Nghia']
firtNames = ['Nguyen', 'Hoang', 'Ly', 'Tran', 'Le', 'Phan']
address = ['Quang Nam', 'Da Nang', 'Quang Tri',
           'TP Ha Noi', 'TP Ho Chi Minh', 'KonTum']

i = 0
json_object = {"employees": []}

for firtName in firtNames:
    for lastName in lastNames:
        employee = {
            "id": i,
            "name": firtName+' '+lastName,
            "email": firtName+lastName+'@gmail.com',
            "phone": '0'+str(np.random.randint(10000000, 99999999)),
            "gender": np.random.randint(0, 2) == 1,
            "status": np.random.randint(0, 2) == 1,
            "address": address[np.random.randint(0, len(address))],
        }
        json_object['employees'].append(employee)
        i += 1
# os.remove('./src/db2.json')
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
indexs = np.arange(len(json_object['employees']))
np.random.shuffle(indexs)
json_object['employees'] = [json_object['employees'][index]
                            for index in indexs]

print(json_object['employees'][:10])

json_object = json.dumps(json_object, indent=4)
with open("db2.json", "w") as outfile:
    outfile.write(json_object)
