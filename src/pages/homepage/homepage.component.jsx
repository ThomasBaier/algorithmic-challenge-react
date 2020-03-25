/* Not satisfied with this, but time is running off and i learned something */ 

import React from 'react';
import './homepage.styles.scss'
class Homepage extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            graph:{
                nodes: [
                  { "id": "nA", "label": "A", "x": 1, "y": 1, "size": 24 ,"visited": false},
                  { "id": "nB", "label": "B", "x": 3, "y": 1, "size": 24 ,"visited": false},
                  { "id": "nC", "label": "C", "x": 2, "y": 4, "size": 24 ,"visited": false},
                  { "id": "nD", "label": "D", "x": 1, "y": 6, "size": 24 ,"visited": false},
                  { "id": "nE", "label": "E", "x": 6, "y": 2, "size": 24 ,"visited": false},
                  { "id": "nF", "label": "F", "x": 5, "y": 4, "size": 24 ,"visited": false},
                  { "id": "nG", "label": "G", "x": 6, "y": 6, "size": 24 ,"visited": false},
                  { "id": "nH", "label": "H", "x": 8, "y": 6, "size": 24 ,"visited": false}
                ],
                edges: [
                  { "id": "e0", "source": "nA", "target": "nB", "color": "#0000ff" },
                  { "id": "e1", "source": "nA", "target": "nD" },
                  { "id": "e2", "source": "nA", "target": "nC" },
                  { "id": "e3", "source": "nB", "target": "nE" },
                  { "id": "e4", "source": "nB", "target": "nC" },
                  { "id": "e5", "source": "nB", "target": "nF" },
                  { "id": "e6", "source": "nC", "target": "nF" },
                  { "id": "e7", "source": "nD", "target": "nG" },
                  { "id": "e8", "source": "nE", "target": "nG" },
                  { "id": "e9", "source": "nF", "target": "nG" },
                  { "id": "e10", "source": "nG", "target": "nH" }
                ]
              },
              end: 'nH',
        }
        this.findAllPaths = this.findAllPaths.bind(this);
        this.allNeighbors = this.allNeighbors.bind(this);
        this.recursiv = this.recursiv.bind(this);

    }

    allNeighbors(start, edges){
        return edges.filter(edge => edge.source === start)
    }

    
    recursiv(edgesNow, path, allPaths ) {
        console.log(path, edgesNow)
        edgesNow.forEach(element => {
            let path1 = path +' -> ' +element.target;
          
            if (element.target === this.state.end){
                allPaths.push(path1)
               console.log('path finish', path1)
               path1 = ''
            } else {
                console.log(path1)
                let edgesNext = this.allNeighbors(element.target, this.state.graph.edges)
                this.recursiv(edgesNext, path1, allPaths)    
            }
    })}

    findAllPaths(props){
        let start = 'nA'

        let edges = this.state.graph.edges
        let path = ''
        let allPaths = []

        // A
        path = start
        let nextToVisitNodes = this.allNeighbors(start, edges)
        console.log('nextToVisitNodes', nextToVisitNodes)

        // For Each edges from A TODO
        this.recursiv(nextToVisitNodes, path, allPaths)
        console.log('Result Test 1:', allPaths)

        let maxLength = null;
        let shortestWay = '';
        allPaths.forEach(element => { 
            if (maxLength === null  || element.length < maxLength ){
                maxLength = element.length;
                shortestWay = element
                // TODO: What if two ways are the same length
            }
        })
        console.log('Result Test 2:', shortestWay)

    }
    componentDidMount(){
        console.log(this.state.graph)

        console.log(this.state.graph.edges)
    }

    render(){
        return (
            <div className='HomePage'>
            <h1>Coding Challenge Diginex</h1>
            <button onClick={this.findAllPaths}>First Find all Pathes</button>
            <span>Results and Calculation are visulized in console</span>
            </div>
        )
    }
}
export default Homepage;