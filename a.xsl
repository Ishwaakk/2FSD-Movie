<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>CineMatch - Movie List</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #121212;
                        color: #ffffff;
                        margin: 0;
                        padding: 0;
                        line-height: 1.6;
                    }
                    header {
                        background-color: #1f1f1f;
                        padding: 15px 20px;
                        border-bottom: 2px solid #ff5722;
                        text-align: center;
                    }
                    header h1 {
                        color: #ff5722;
                        font-size: 2.5rem;
                        text-shadow: 2px 2px 5px #000;
                    }
                    table {
                        width: 80%;
                        margin: 20px auto;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 2px solid #ff5722;
                        padding: 10px;
                        text-align: center;
                    }
                    th {
                        background-color: #ff5722;
                        color: #000;
                        font-size: 1.2rem;
                    }
                    tr:nth-child(even) {
                        background-color: #1f1f1f;
                    }
                    tr:nth-child(odd) {
                        background-color: #333;
                    }
                    footer {
                        background-color: #1f1f1f;
                        color: #ffffff;
                        text-align: center;
                        padding: 10px;
                        border-top: 2px solid #ff5722;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>CineMatch - Movie List</h1>
                </header>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rating</th>
                        <th>Release Year</th>
                    </tr>
                    <xsl:for-each select="movies/movie">
                        <xsl:sort select="title"/>
                        <tr>
                            <td><xsl:value-of select="title"/></td>
                            <td><xsl:value-of select="genre"/></td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="rating &gt;= 8.0">
                                        <strong style="color:#00ff00;"><xsl:value-of select="rating"/></strong>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <span style="color:#ff0000;"><xsl:value-of select="rating"/></span>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:value-of select="releaseYear"/>
                                <xsl:if test="releaseYear &gt; 2000">
                                </xsl:if>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <footer>
                    <p>&#169; 2025 CineMatch | All rights reserved.</p>
                </footer>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
