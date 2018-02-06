/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.nanos.tomcat;

import foam.nanos.http.NanoRouter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Subdomain Router
 * Used to route sub projects to a more easily accessible path
 */
public class SubdomainRouter
    extends NanoRouter
{
  {
    x_ = new foam.nanos.boot.Boot().getX();
  }

  @Override
  protected synchronized void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    String path = getServletConfig().getInitParameter("path");
    RequestDispatcher view = req.getRequestDispatcher(path);
    view.forward(req, resp);
  }
}