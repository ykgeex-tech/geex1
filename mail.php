<?php
// Set internal encoding
mb_language("japanese");
mb_internal_encoding("UTF-8");

// Destination email address
$to = 'yk.geex@gmail.com';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $company = htmlspecialchars($_POST['company-name'], ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $subject_input = htmlspecialchars($_POST['subject'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

    // Create email subject
    $subject = "【HPよりお問い合わせ】" . $subject_input;

    // Create email body
    $body = "ホームページのお問い合わせフォームより、以下のメッセージが届きました。\n\n";
    $body .= "--------------------------------------------------\n";
    $body .= "【会社名】 " . $company . "\n";
    $body .= "【担当者名】 " . $name . "\n";
    $body .= "【電話番号】 " . $tel . "\n";
    $body .= "【メールアドレス】 " . $email . "\n";
    $body .= "【件名】 " . $subject_input . "\n";
    $body .= "--------------------------------------------------\n\n";
    $body .= "【相談内容】\n";
    $body .= $message . "\n";

    // Set headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Send email
    if (mb_send_mail($to, $subject, $body, $headers)) {
        // Success
        echo "<script>alert('お問い合わせありがとうございます。送信が完了しました。'); window.location.href = 'index.html';</script>";
    } else {
        // Failure
        echo "<script>alert('メールの送信に失敗しました。お手数ですが、直接ご連絡ください。'); window.history.back();</script>";
    }
} else {
    // Redirect if accessed directly
    header("Location: index.html");
    exit;
}
?>
