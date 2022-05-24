// logical condition
if (true)
{

}
else {

}

// race condition
var task1;
var task2;
await Task.WhenAny([task1, task2]);

await Task.WhenAll([task1, task2]);

// iteration
foreach (var i in items) {
  bla(i);
}

while (tasks.Count > 1) 
{
  if (batch.Count < maxBatchSize) {
    items.Add(new Task());
  } 
  else 
  {
    var first = await Task.WhenAny(items);
    items.Remove(first);
  }
}


lines represent execution sequence
nodes can also use data from other nodes earlier in their sequence

