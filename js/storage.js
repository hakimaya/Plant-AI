function f(a,b,c)
{
    var x = 18;
    if(a >= 18)
        {
            console.log("access autorise");
        }
    if(a < 18)
        {
            console.log("acces refuse ");
        }

    if(b == "123456")
     {
        alert("attention mot de passe faible");
    }

    let mssg = "bonjour " + c + ",votre mots de passe est : " + b;

    return mssg
}