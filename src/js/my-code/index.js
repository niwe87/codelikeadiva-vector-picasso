class Artwork {
  constructor() {}

  init() {
    const artwork = document.getElementById('artwork-wrapper');

    this.svgNS = "http://www.w3.org/2000/svg";
    this.tempWidth = artwork.clientWidth;
    this.numberColors = 1000;

    this.svg = document.createElementNS(this.svgNS, "svg");
    this.svg.setAttribute("width", "900");
    this.svg.setAttribute("height", "600");
    this.svg.setAttribute("version", "1.1");

    this.svg.appendChild(this.createColor());

    //fixed positioned drops
    const posArr = ['50,100',
                    '40,300', 
                    '700,500', 
                    '850,150', 
                    '400,250', 
                    '330,550', 
                    '150,424', 
                    '250,30', 
                    '576,150', 
                    '323,178', 
                    '245,375', 
                    '734,320', 
                    '625,475', 
                    '525,376', 
                    '795,20', 
                    '856,460', 
                    '10,527', 
                    '395,423',
                    '128,186',
                    '589,40',
                    '398,83',
                    '825,265',
                    '725,185'

                  ];

    for (let i = 0; i < posArr.length; i++) {
      //ranodm position
      // this.svg.appendChild(this.createGroup(parseInt(Math.random() * (this.tempWidth - 40) + 20, 10) + ',' + parseInt(Math.random() * (this.tempHeight - 40) + 20, 10)));
      
      //fixed position from array
      this.svg.appendChild(this.createGroup(posArr[i]));
    }
    
    artwork.appendChild(this.svg);
  }

  createGroup(pos) {
    let group = document.createElementNS(this.svgNS, 'g');
    //move circle to random point on view
    group.setAttribute('transform', 'translate(' + pos + ')');

    let groupRotate = document.createElementNS(this.svgNS, 'g');
    // could rotate it random
    groupRotate.setAttribute('transform', 'rotate(' + 30 + ')');
    
    const lengthNum = parseInt(Math.random() * 5000 + 5000,10);
    const tempVal = (this.tempWidth / (1.2 + Math.random() * 1.5));
    
    //create circle with pathes
    for (let l = 0; l < 360; l += 2) {
      let tempStr = '';
      
      for (let i = 1; i < lengthNum; i+=30) {
        const tempX = this.roundDecimal(tempVal * (i / lengthNum));
        const tempY = this.roundDecimal((Math.sin(i * Math.PI / 180) * 10));

        tempStr += tempX + ',' + tempY + ' '
      }
      
      groupRotate.appendChild(this.drawPath('M0,0 ' + tempStr, 'url(#linear' + parseInt(((l+1)/360 * this.numberColors),10) + ')', l));
    }
    
    group.appendChild(groupRotate);
    
    return group;
  }

  //Max 2 decimals
  roundDecimal(value) {
    let temp = (value + '').split('.');
    
    if(temp.length === 2){
      temp[1] = temp[1].slice(0,2);
    }
    
    return temp.join('.');
  }
  
  //draw path element
  drawPath(d, color, rotate) {
    let path = document.createElementNS(this.svgNS, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", 3);
    path.setAttribute("transform", 'rotate(' + rotate + ')')
    path.setAttribute("d", d);
    return path;
  }

  //create color gradients
  createColor() {
    let defs = document.createElementNS(this.svgNS, 'defs');

    for (let i = 0; i < this.numberColors; i++) {
      let linearGradient = document.createElementNS(this.svgNS, 'linearGradient');
      linearGradient.setAttribute('id', 'linear'+i);
      linearGradient.setAttribute('x1', '0%');
      linearGradient.setAttribute('y1', '0%');
      linearGradient.setAttribute('x2', '60%');
      linearGradient.setAttribute('y2', '0%');

      let s1 = document.createElementNS(this.svgNS, 'stop');
      s1.setAttribute('offset', '0%');
      s1.setAttribute('stop-color', '#' + (0x1000000 + (0xffffff * ((i+1)/1000))).toString(16).substr(1, 6) + '14' );
      linearGradient.appendChild(s1);

      let s2 = document.createElementNS(this.svgNS, 'stop');
      s2.setAttribute('offset', '50%');
      s2.setAttribute('stop-color', '#ffffff00');
      linearGradient.appendChild(s2);

      defs.appendChild(linearGradient);
    }

    return defs;
  }
}

export default Artwork;
