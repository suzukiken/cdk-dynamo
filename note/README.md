+++
title = "Dynamo DBのテーブルのキャパシティー"
date = "2021-03-26"
tags = ["Dynamo DB"]
+++

Dynamo DBのテーブルのキャパシティーの設定にはいくつかあってCDKでそれぞれ作ってみたのがこれら。

* [On-demandキャパシティーの場合](https://github.com/suzukiken/cdkdynamo/blob/master/lib/cdkdynamo-stack.ts)
* [Provisionedキャパシティーを最小に固定する場合](https://github.com/suzukiken/cdkdynamo/blob/master/lib/cdkdynamo-fixedscale-stack.ts)
* [オートスケーリングにする場合](https://github.com/suzukiken/cdkdynamo/blob/master/lib/cdkdynamo-autoscale-stack.ts)

この中では特別理由がない限りキャパシティーモードはOn-demandにしておけば良いかなあと私は思っていて、その理由はこうしたものだ。

* On-demandはProvisionedに比べると1CUあたり数倍の価格だと思うが、むしろDBを使わない時間の方が長い。だから結果的にOn-demandが安上がりになる。
* read/writeを1など小さくに固定すると一気にデータを投入しようと思った時にその制限が邪魔になる。
* 必要な時だけキャパシティーを手動で変更するのは面倒くさい。それを自動化するのもまためんどくさい。
* しかもキャパシティーを小さくできるのは1日4回までなので、自動化しても手軽に使えない。（[参考](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html)）
* オートスケーリングを設定してあるテーブルに、botoを使って繰り返しデータの書き込みをした場合に、botoのリトライを10回にしておいても書き込みに失敗するが、On-demandを設定してあると取りこぼしがなかった。これは自分の利用したい用途には十分な性能だと思った。

なお

* 価格についてはOn-demandは無料枠がないが、Provisionedなら25WCU・RCUまでは無料枠。
* データの投入についてもバースト用に5分間の貯蓄があるので、瞬間的には最大300倍の要求を処理できるわけで、その範囲で済む可動かもポイントになる（[参考](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html#bp-partition-key-throughput-bursting)）
