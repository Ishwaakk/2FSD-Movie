<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>CineMatch Movie List</title>
                <style>
                    table { border-collapse: collapse; width: 60%; margin: 20px; }
                    th, td { border: 1px solid black; padding: 10px; text-align: center; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Movies in CineMatch</h2>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rating</th>
                        <th>Release Year</th>
                    </tr>
                    <xsl:for-each select="movies/movie">
                        <xsl:sort select="rating" data-type="number" order="descending"/>
                        <tr>
                            <td><xsl:value-of select="title"/></td>
                            <td><xsl:value-of select="genre"/></td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="rating &gt; 8.5">
                                        <b><xsl:value-of select="rating"/></b>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="rating"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:if test="releaseYear &lt; 2015">
                                    <xsl:value-of select="releaseYear"/>
                                </xsl:if>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
