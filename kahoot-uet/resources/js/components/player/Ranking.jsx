import React from 'react';

function Ranking() {

    const test = [
        {
            name: "test1",
            score: 1000
        },
        {
            name: "test2",
            score: 2000
        },
        {
            name: "test3",
            score: 3000
        },
        {
            name: "test4",
            score: 4000
        }
    ]

    function compare( a, b ) {
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        return 0;
      } 
    test.sort( compare );
    const li_player = test.slice(0, 3).map((data, index) => {
        return (
        <li className="ranking-list-li">
            <span className="ranking-span">
                <span className='ranking-span-name'>{data.name}</span>
                <span className="ranking-span-score">{data.score}</span>
            </span>
        </li>
        )
    })

    return (
        <div className="ranking-main">
            <div className="ranking-header-next">
                <button type="button" class="btn btn-light ranking-button">Next</button>
            </div>
            <ol className="ranking-list">
                {li_player}
            </ol>
        </div>
    )
}

export default Ranking
