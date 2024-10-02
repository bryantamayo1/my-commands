/**
 * Create query &command=[data]&meaning=[data]
 * @param {array} buffer
 * @param {input_value} string
 */
export const parseQuery = (buffer, input_value) => {
    // 1ª Search actived toggle in globalBufferFiltersQueries
    const filterActived = buffer.find(item => item.active === true);
    let query = filterActived.query;
    if(input_value !== ""){
        switch (filterActived.index) {
            // &command=&meaning=
            case 0:
                const queries = filterActived.query.split("=");
                queries.pop();
                for(let i = 0; i < queries.length; i++) {
                    queries[i] = queries[i] + "="+ input_value;
                }
                return queries.join("");
            case 1:
                return query + input_value;
            case 2:
                return query + input_value;
        }
        return query;
    }else{
        return "";
    }
}

/**
 * Parse string query to object with queries
 * @param {string} queryString e.g. ?numero=1&empresa=c&fin=30&pec=1&total=2&estado=3&fecha=fecha&inicio=inicio
 * @returns {Object} object with queries
 */
 export const getQueries = (queryString) => {
    const query = new URLSearchParams(queryString);
    const queryAux = {}
    query.forEach(function(value, key) {
        queryAux[key] = value;
    });
    return queryAux;
}

/**
 * Get query like a string of {command: "test", meaning: "test"}
 * @param {object} queryObject
 * @return string &command=test&meaning=test
 */
export const getQueriesCommanMeaning = (queryObject) => {
    let result = "";
    if(queryObject.command){
        result = "&command=" + queryObject.command;
    }
    if(queryObject.meaning){
        result = result + "&meaning=" + queryObject.meaning;
    }
    return result;
}  

/**
 * It’s used in schema SubCategories
 */
 export const colorsEnum = {
     "blue": "linear-gradient(\
          270deg,\
          hsl(210deg 100% 49%) 0%,\
          hsl(210deg 100% 47%) 11%,\
          hsl(209deg 100% 46%) 22%,\
          hsl(208deg 100% 44%) 33%,\
          hsl(208deg 93% 44%) 44%,\
          hsl(209deg 85% 44%) 56%,\
          hsl(209deg 78% 44%) 67%,\
          hsl(210deg 71% 44%) 78%,\
          hsl(210deg 65% 43%) 89%,\
          hsl(210deg 59% 43%) 100%\
        )",
    "green": "linear-gradient(\
            270deg,\
            hsl(175deg 100% 39%) 0%,\
            hsl(175deg 97% 39%) 11%,\
            hsl(175deg 94% 38%) 22%,\
            hsl(175deg 91% 38%) 33%,\
            hsl(175deg 88% 37%) 44%,\
            hsl(175deg 86% 37%) 56%,\
            hsl(175deg 84% 36%) 67%,\
            hsl(175deg 82% 35%) 78%,\
            hsl(175deg 80% 35%) 89%,\
            hsl(175deg 78% 34%) 100%\
        )",
    "orange": "linear-gradient(\
            270deg,\
        hsl(26deg 100% 65%) 0%,\
        hsl(26deg 96% 64%) 11%,\
        hsl(26deg 91% 62%) 22%,\
        hsl(26deg 88% 61%) 33%,\
        hsl(26deg 84% 60%) 44%,\
        hsl(26deg 81% 58%) 56%,\
        hsl(26deg 77% 57%) 67%,\
        hsl(26deg 75% 56%) 78%,\
        hsl(26deg 72% 54%) 89%,\
        hsl(26deg 69% 53%) 100%\
    )",
    "pink": "linear-gradient(\
       270deg,\
       hsl(313deg 96% 41%) 0%,\
       hsl(313deg 94% 41%) 11%,\
       hsl(313deg 92% 41%) 22%,\
       hsl(313deg 90% 41%) 33%,\
       hsl(313deg 88% 41%) 44%,\
       hsl(313deg 87% 41%) 56%,\
       hsl(313deg 85% 41%) 67%,\
       hsl(313deg 84% 41%) 78%,\
       hsl(313deg 83% 40%) 89%,\
       hsl(313deg 81% 40%) 100%\
      )",
}