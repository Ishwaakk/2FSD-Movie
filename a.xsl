<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>CineMatch Movie List</title>
                <link rel="stylesheet" type="text/css" href="styles.css"/>
                <style>
                    /* Movie Table Styling */
                    table {
                        border-collapse: collapse;
                        width: 80%;
                        margin: 30px auto;
                        background-color: #1f1f1f;
                        color: #ffffff;
                        border: 2px solid #ff5722;
                    }
                    th, td {
                        border: 1px solid #ff5722;
                        padding: 12px;
                        text-align: center;
                    }
                    th {
                        background-color: #ff5722;
                        color: #000;
                        font-size: 1.2rem;
                        text-shadow: 1px 1px 3px #000;
                    }
                    td {
                        font-size: 1rem;
                    }
                    tr:nth-child(even) {
                        background-color: #222;
                    }
                    tr:hover {
                        background-color: #ff5722;
                        color: #000;
                        transition: all 0.3s ease-in-out;
                    }
                </style>
            </head>
            <body>
                <header>
                    <div class="header-container">
                        <h1>CineMatch Movie Listings</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Movies</a></li>
                            <li><a href="#">Bookings</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </header>

                <h2 style="text-align: center; color: #ff5722; margin-top: 20px;">Movies Available in CineMatch</h2>

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
                                        <b style="color: #ff5722;"><xsl:value-of select="rating"/></b>
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

                <footer>
                    <p>&copy; 2025 CineMatch | All rights reserved.</p>
                </footer>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
