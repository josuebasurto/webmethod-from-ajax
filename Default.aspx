<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="styles/kendo.common.min.css" rel="stylesheet" />

</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="grid"></div>
        <hr />
        <div id="result">
        </div>
    </div>
    </form>

    <script src="js/jquery.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/kendo.all.min.js"></script>
    <script src="js/kendo.datepicker.min.js"></script>
    <script src="js/kendo.datetimepicker.min.js"></script>
    <script src="js/kendo.grid.min.js"></script>
    <script src="grid.js"></script>

</body>
</html>
