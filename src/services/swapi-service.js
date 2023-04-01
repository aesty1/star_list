import bd from './bd.js';
export default class SwapiService {
  _apiBase = 'https://spapi.dev/api';
  __base_url = window.location.origin;
  _imageBase = 'https://southparkstudios.mtvnimages.com/';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
    
  }
  async getSomethinkArr(somethink) {
    const res = await this.getResource(`/${somethink}`);
    return res.data.map(this._transformcharactersArr);
  }
  _transformcharactersArr = (person) => {
    return {
      name:  person.name,
      id: person.id
    }
  }
  async getSomethink(somethink, id) {
    const res = await this.getResource(`/${somethink}/${id}/`);
    return this[`_transform${somethink}`](res);
  }
  _extractId(it, itemText) {
    itemText = itemText.toLowerCase();
    const database = bd[it]
    let regCheck1 = / itemText[0] /i;
    let regCheck2 = / itemText[1] /i;
    let indx = [];
    function levenshtein(s1, s2, costs) {
      var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
      l1 = s1.length;
      l2 = s2.length;
  
      costs = costs || {};
      var cr = costs.replace || 1;
      var cri = costs.replaceCase || costs.replace || 1;
      var ci = costs.insert || 1;
      var cd = costs.remove || 1;
  
      cutHalf = flip = Math.max(l1, l2);
  
      var minCost = Math.min(cd, ci, cr);
      var minD = Math.max(minCost, (l1 - l2) * cd);
      var minI = Math.max(minCost, (l2 - l1) * ci);
      var buf = new Array((cutHalf * 2) - 1);
  
      for (i = 0; i <= l2; ++i) {
          buf[i] = i * minD;
      }
  
      for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
          ch = s1[i];
          chl = ch.toLowerCase();
  
          buf[flip] = (i + 1) * minI;
  
          ii = flip;
          ii2 = cutHalf - flip;
  
          for (j = 0; j < l2; ++j, ++ii, ++ii2) {
              cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
              buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
          }
      }
      return buf[l2 + cutHalf - flip];
    }
    switch(it) {
      case 'locations':
        itemText = / /ig[Symbol.split](itemText); 
        
        
        for(let i = 0; i < bd[it].length; i++) {
          
          for(let k = 0; k < itemText.length; k++) {
            if(bd[it][i].includes(itemText[k])) {
              indx.push(bd[it][i]);
              if(bd[it][i].includes(itemText[k+1])) {
                indx.push(bd[it][i]);
                if(bd[it][i].includes(itemText[k+2])) {
                  indx.push(bd[it][i]);
                  
                  if(bd[it][i].includes(itemText[k+3])) {
                    indx.push(bd[it][i]);
                    
                    if(bd[it][i].includes(itemText[k+4])) {
                      indx.push(bd[it][i]);
                      continue;
                    }
                    continue;
                  }
                  continue;
                  
                }
                continue;
                
                
              }
              if(indx.length < 1 ) {
                indx.push(bd[it][i]);
              }
              
            }
          }
        };
            
        
        let foundItems = bd[it].indexOf(itemText[itemText.length-1]);
        if(foundItems.length > 1) {
          foundItems = bd[it].find((el) => el.includes(itemText[itemText.length-2+"-"+itemText.length-1]));
        }
        return this._imageBase+bd[it].find((el) => el.includes(itemText[itemText.length-1]));
      case 'characters':
        // const itemIncludesText = bd.characters.filter((el) => el.toLowerCase().indexOf(regCheck1));
        // console.log(itemIncludesText)
        // return;
        let ind = []
        let similarPercent = 0;
        let simDic = {}
        for(let i = 0; i < bd[it].length; i++) {
          
          if(levenshtein(itemText, bd[it][i]) > similarPercent) {
            similarPercent += levenshtein(itemText, bd[it][i]);
            ind = bd[it][i];
            console.log(ind)
          }

        };
            
        
        // let foundItems2 = bd[it].indexOf(itemText[itemText.length-1]);
        // if(foundItems2.length > 1) {
        //   foundItems2 = bd[it].find((el) => el.includes(itemText[itemText.length-2+"-"+itemText.length-1]));
        // }
        return this._imageBase+ind;
    }
    
    
  }
  _transformcharacters = (person) => {
    return {
      id: this._extractId("characters", person.data.name),
      name: person.data.name,
      gender: person.data.sex,
      hair_color: person.data.hair_color,
      religion: person.data.religion
    }
  }
  _transformlocations = (location) => {
    return {
      Id: this._extractId("locations", location.data.name),
      name: location.data.name,
      created_at: location.data.created_at
    }
  }
  
  _transformstarships = (starship) => {
    return {
      Id: this._extractId(starship, "starships"),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      cost_in_credits: starship.cost_in_credits,
      length: starship.length,
      max_atmosphering_speed: starship.max_atmosphering_speed,
      starship_class: starship.starship_class
    }
  }
}
