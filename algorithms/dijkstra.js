/*
  Dijkstra's Algorthm is weighted and guarantees the shortest path. Calling the
  function will return an array of nodes in the order of the visitation
  for animation. Starts with all node distances set to Infinity except the start node.
  Neighbors of visited nodes are then update with new distances according to weight.
  The next node to visit is determined by lowest distance.
*/
function dijkstra(board, startNode, endNode)
{
  startNode.distance = 0;
  let visitedNodesInOrder = [];
  var unvisitedNodes = board.getNodeList();

  while(unvisitedNodes.length > 0)
  {
    sortNodesByDistance(unvisitedNodes);
    //Skips Nodes if they are walls.
    if(unvisitedNodes[0].isWall)
    {
      unvisitedNodes.shift();
      continue;
    }
    //No possible path to target.
    if(unvisitedNodes[0].distance === Infinity)
    {
      return visitedNodesInOrder;
    }
    unvisitedNodes[0].visited = true;
    visitedNodesInOrder.push(unvisitedNodes[0]);
    if(unvisitedNodes[0] === endNode)
    {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(unvisitedNodes[0], board);
    unvisitedNodes.shift();
  }
}

//Sorts unvisited node array by distance.
function sortNodesByDistance(unvisitedNodes)
{
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

//Updates the distance of neighbors by adding 1 to current distance.
function updateUnvisitedNeighbors(node, board)
{
  let neighbors = board.getUnvisitedNeighbors(node);
  for(neighbor of neighbors)
  {
    neighbor.distance = node.distance + neighbor.weight;
    neighbor.previousNode = node;
  }
}
