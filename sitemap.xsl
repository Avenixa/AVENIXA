<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="id">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — Avenixa Labs</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: #0a0f2c;
            color: #e2e8f0;
            min-height: 100vh;
          }

          header {
            background: linear-gradient(135deg, #0f2460 0%, #1e3a8a 100%);
            padding: 40px 40px 30px;
            border-bottom: 1px solid rgba(96,165,250,0.2);
          }

          .header-inner {
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .logo-text {
            font-size: 1.6rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: 1px;
          }

          .logo-text span {
            color: #60a5fa;
          }

          .subtitle {
            font-size: 0.85rem;
            color: #93c5fd;
            margin-top: 4px;
          }

          .badge {
            margin-left: auto;
            background: rgba(96,165,250,0.15);
            border: 1px solid rgba(96,165,250,0.3);
            color: #93c5fd;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
          }

          main {
            max-width: 900px;
            margin: 40px auto;
            padding: 0 20px;
          }

          .stats {
            display: flex;
            gap: 16px;
            margin-bottom: 30px;
          }

          .stat-box {
            background: rgba(30,58,138,0.3);
            border: 1px solid rgba(96,165,250,0.15);
            border-radius: 12px;
            padding: 16px 24px;
            flex: 1;
            text-align: center;
          }

          .stat-box .num {
            font-size: 2rem;
            font-weight: 700;
            color: #60a5fa;
          }

          .stat-box .label {
            font-size: 0.75rem;
            color: #94a3b8;
            margin-top: 4px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(15,36,96,0.4);
            border: 1px solid rgba(96,165,250,0.15);
            border-radius: 12px;
            overflow: hidden;
          }

          thead {
            background: rgba(30,58,138,0.6);
          }

          thead th {
            padding: 14px 20px;
            text-align: left;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #93c5fd;
            font-weight: 600;
          }

          tbody tr {
            border-top: 1px solid rgba(96,165,250,0.08);
            transition: background 0.2s;
          }

          tbody tr:hover {
            background: rgba(96,165,250,0.07);
          }

          td {
            padding: 14px 20px;
            font-size: 0.875rem;
            vertical-align: middle;
          }

          td a {
            color: #60a5fa;
            text-decoration: none;
            word-break: break-all;
          }

          td a:hover {
            color: #93c5fd;
            text-decoration: underline;
          }

          .priority-bar {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .bar-bg {
            flex: 1;
            height: 6px;
            background: rgba(96,165,250,0.1);
            border-radius: 3px;
            overflow: hidden;
          }

          .bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #1e40af, #60a5fa);
            border-radius: 3px;
          }

          .priority-num {
            font-size: 0.75rem;
            color: #94a3b8;
            min-width: 24px;
          }

          .changefreq {
            background: rgba(96,165,250,0.1);
            border: 1px solid rgba(96,165,250,0.2);
            color: #93c5fd;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
          }

          footer {
            text-align: center;
            padding: 30px;
            color: #475569;
            font-size: 0.8rem;
          }
        </style>
      </head>
      <body>
        <header>
          <div class="header-inner">
            <div>
              <div class="logo-text">AVENIXA <span>LABS</span></div>
              <div class="subtitle">XML Sitemap — avenixalabs.my.id</div>
            </div>
            <div class="badge">Sitemap Index</div>
          </div>
        </header>

        <main>
          <div class="stats">
            <div class="stat-box">
              <div class="num"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="label">Total URL</div>
            </div>
            <div class="stat-box">
              <div class="num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.8])"/></div>
              <div class="label">Prioritas Tinggi</div>
            </div>
            <div class="stat-box">
              <div class="num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:changefreq = 'weekly'])"/></div>
              <div class="label">Update Mingguan</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Frekuensi</th>
                <th>Prioritas</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td style="color:#475569;"><xsl:value-of select="position()"/></td>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td style="color:#94a3b8;"><xsl:value-of select="sitemap:lastmod"/></td>
                  <td><span class="changefreq"><xsl:value-of select="sitemap:changefreq"/></span></td>
                  <td>
                    <div class="priority-bar">
                      <div class="bar-bg">
                        <div class="bar-fill">
                          <xsl:attribute name="style">
                            width: <xsl:value-of select="sitemap:priority * 100"/>%
                          </xsl:attribute>
                        </div>
                      </div>
                      <span class="priority-num"><xsl:value-of select="sitemap:priority"/></span>
                    </div>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>

        <footer>
          © 2025 Avenixa Labs — Generated Sitemap
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
