using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    /// <summary>
    /// Parameter called from ajax
    /// </summary>
    /// <param name="param0"></param>
    /// <param name="param1"></param>
    /// <returns></returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public static string postMetodo(string param0, string param1)
    {
        return "postMetodo, parametro: " + param0 + " otrosParametros: " + param1;
    }
}