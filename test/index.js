var g=globalThis,SQLiteWASMFactory=(g.importScripts||require)('../src/factory.js')||g.SQLiteWASMFactory;
var sdb=SQLiteWASMFactory.sync();
// SQLiteWASMFactory.async().then(sdb=>{
  var db=new sdb.Database;
  db.exec(`create table t1(
    key text,
    val text,
    primary key(key)
  )`);
  it=db.prepare(`
insert into t1(key,val) values(?,?)
  `);
  it.run(['k1','v1']);
  it.run(['k2','v2']);
  it.run(['k3','v1']);
  s=db.prepare(`
select *
from t1
where val = ?
limit ?,?`);
  s.bind(['v1',0,3]);
  console.log(
    s.step()&&s.get(),
    s.step()&&s.get(),
    s.step()&&s.get(),
    s.step()&&s.get(),
    s.step()&&s.get(),
    s.step()&&s.get(),
  )
// });
