jQuery(document).ready(function ($) {
  $("#login-form").on("submit", function (e) {
    e.preventDefault();

    const email = $('input[name="email"]').val();
    const password = $('input[name="password"]').val();

    if (!email || !password) {
      $("#login-message").text("All fields (email, password) are required.");
      return;
    }

    $.ajax({
      url: authVars.ajax_url,
      type: "POST",
      data: {
        action: "handle_login",
        email: email,
        password: password,
        _wpnonce: authVars.nonce,
      },
      xhrFields: {
        withCredentials: true,
      },
      success: function (response) {
        if (response.success) {
          const access_token = response.data.data.access_token;
          const refresh_token = response.data.data.refresh_token;
          if (access_token && refresh_token) {
            document.cookie = `access_token=${access_token}; path=/;`;
            document.cookie = `refresh_token=${refresh_token}; path=/;`;
          }
          $("#login-message").text("Login successful! Redirecting...");
          window.location.href = "/dashboard/";
        } else {
          const errorMessage =
            response.data?.error ||
            `Login failed (${response.status}). Please try again.`;
          $("#login-message").text(errorMessage);
        }
      },
      error: function (xhr) {
        $("#login-message").text(
          `An error occurred (${xhr.status}). Please try again.`
        );
      },
    });
  });

  $("#register-form").on("submit", function (e) {
    e.preventDefault();

    const username = $('input[name="username"]').val();
    const email = $('input[name="email"]').val();
    const company = $('input[name="company"]').val();
    const password = $('input[name="password"]').val();
    const confirm_password = $('input[name="confirm-password"]').val();

    if (!username || !email || !company || !password || !confirm_password) {
      $("#register-message").text("All fields are required.");
      return;
    }

    if (password !== confirm_password) {
      $("#register-message").text("Passwords do not match.");
      return;
    }

    $.ajax({
      url: authVars.ajax_url,
      type: "POST",
      data: {
        action: "handle_register",
        name: username,
        email: email,
        company: company,
        password: password,
        confirm_password: confirm_password,
        _wpnonce: authVars.nonce,
      },
      success: function (response) {
        if (response.success) {
          $("#register-message").text(
            "Registration successful! Please log in."
          );
          $("#register-form")[0].reset();
          window.location.href = "/login/";
        } else {
          const errorMessage =
            response.data?.error || "Registration failed. Please try again.";
          $("#register-message").text(errorMessage);
        }
      },
      error: function (xhr) {
        $("#register-message").text(
          `An error occurred (${xhr.status}). Please try again later.`
        );
      },
    });
  });
});
