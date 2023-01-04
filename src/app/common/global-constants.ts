export class GlobalConstants {
    // var parts = location.hostname.split('.').shift();
    // console.log(parts);
    // var subdomain = parts.shift();
    // console.log(subdomain);
     public static region: string = 's3';
    // public static region: string = location.hostname.split('.').shift();
    public static regionLetter = {'n1': 'A',
    'n2': 'B',
    'n3': 'C',
    'ne1': 'D',
    'ne2': 'E',
    'ne3': 'F',
    'c1': 'G',
    'c2': 'H',
    'c3': 'I',
    's1': 'J',
    's2': 'K',
    's3': 'L'};
    public static regionNumber = {'n1': '01',
    'n2': '02',
    'n3': '03',
    'ne1': '04',
    'ne2': '05',
    'ne3': '06',
    'c1': '07',
    'c2': '08',
    'c3': '09',
    's1': '10',
    's2': '11',
    's3': '12'};

    public static regionThai = {'n1': 'กฟน.1',
    'n2': 'กฟน.2',
    'n3': 'กฟน.3',
    'ne1': 'กฟฉ.1',
    'ne2': 'กฟฉ.2',
    'ne3': 'กฟฉ.3',
    'c1': 'กฟก.1',
    'c2': 'กฟก.2',
    'c3': 'กฟก.3',
    's1': 'กฟต.1',
    's2': 'กฟต.2',
    's3': 'กฟต.3'};
}